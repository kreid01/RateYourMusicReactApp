import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Spinner,
  ScrollView,
  Input,
  Button,
  ArrowBackIcon,
  KeyboardAvoidingView,
} from "native-base";
import {
  Message,
  useGetChatMessagesQuery,
  useGetMessagesSubscription,
  usePostMessageMutation,
} from "../generated/graphql";
import { ChatMessaage } from "../components/ChatMessage/ChatMessage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { ChannelName } from "../components/ChannelName/ChannelName";

export const SingleChannelScreen = ({ route, navigation }: any) => {
  const { id } = route.params;

  const [newMessages, setNewMessages] = useState<any[]>();

  const [result, reexecuteQuery] = useGetChatMessagesQuery({
    variables: { id: id },
  });

  const refresh = () => {
    reexecuteQuery({ variables: { id: id }, requestPolicy: "network-only" });
  };

  const { data, fetching } = result;

  useEffect(() => {
    data?.getChatMessages
      ? setNewMessages(data?.getChatMessages as Message[])
      : null;
  }, [data?.getChatMessages]);

  const [messages] = useGetMessagesSubscription({
    variables: { channelId: id as number },
  });

  const { data: chat } = messages;

  useEffect(() => {
    chat?.messageSubscription
      ? setNewMessages((prevState) => [
          ...(prevState as Message[]),
          chat?.messageSubscription,
        ])
      : null;
  }, [chat?.messageSubscription]);

  const [message, setMessage] = useState<string>("");
  const currentUser = useSelector((state: RootState) => state.user.value);

  const [, postMessage] = usePostMessageMutation();

  return (
    <KeyboardAvoidingView
      behavior="position"
      className="min-h-[100vh] relative bg-slate-800"
    >
      <View className="pt-16 pb-4 shadow-lg  bg-slate-900  flex flex-row">
        <Button
          accessibilityLabel="back-button"
          className="absolute rounded-full py-3 top-14  left-5 text-white"
          variant="ghost"
          onPress={() => {
            refresh();
            navigation.navigate("Channels");
          }}
        >
          <ArrowBackIcon style={{ size: "lg", color: "white" }} />
        </Button>
        <Text className="text-xl  text-white mx-auto">
          <ChannelName id={id} />
        </Text>
      </View>
      {fetching ? (
        <ScrollView className="flex w-[90vw] h-[80vh]">
          <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
        </ScrollView>
      ) : (
        <ScrollView className="flex flex-col-reverse w-[90vw] h-[80vh]">
          {data?.getChatMessages &&
            newMessages?.map((message, i) => {
              return (
                <ChatMessaage
                  refresh={refresh}
                  key={i}
                  message={message as Message}
                />
              );
            })}
        </ScrollView>
      )}

      <View className="bottom-0 fixed w-[90vw] mx-auto">
        <Input
          placeholder="Message"
          borderColor="#475569"
          focusOutlineColor="#475569"
          className="h-10  text-white"
          value={message}
          onChangeText={(text) => setMessage(text)}
          InputRightElement={
            <Button
              isDisabled={message.length === 0}
              bgColor="#1e293b"
              onPress={() =>
                postMessage({
                  channelId: id,
                  posterId: currentUser?.id as number,
                  content: message,
                }).then(async ({ data }: any) => {
                  if (data.error) {
                    alert(data.error.message);
                  } else {
                    setMessage("");
                  }
                })
              }
            >
              Send
            </Button>
          }
        ></Input>
      </View>
    </KeyboardAvoidingView>
  );
};
