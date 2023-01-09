import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Spinner,
  Input,
  Button,
  ScrollView,
  ArrowBackIcon,
  KeyboardAvoidingView,
  FlatList,
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
import { useMyInfiniteQuery } from "../hooks/useMyInfiniteQuery";
import { useInfiniteMessageQuery } from "../hooks/UseInfiniteMessageQuery";
//@ts-ignore

const getChatMessagesQuery = `
query getChatMessages($id: Int!, $skip: Int!, $take: Int!) {
getChatMessages(id: $id, skip: $skip, take: $take) {
    channelId
    content
    id
    postDate
    posterId
  }
}`;

export const SingleChannelScreen = ({ route, navigation }: any) => {
  const { id } = route.params;

  const [newMessages, setNewMessages] = useState<any[]>();

  const {
    isSuccess,
    data: messages,
    isFetching,
    refetch,
    loadNext,
  } = useInfiniteMessageQuery(getChatMessagesQuery, id);

  useEffect(() => {
    messages ? setNewMessages(messages.pages.flat() as Message[]) : null;
  }, [messages]);

  const [result] = useGetMessagesSubscription({
    variables: { channelId: id as number },
  });

  const { data: chat } = result;

  useEffect(() => {
    chat?.messageSubscription
      ? setNewMessages((prevState) => [
          chat?.messageSubscription,

          ...(prevState as Message[]),
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
            navigation.navigate("Channels");
          }}
        >
          <ArrowBackIcon style={{ size: "lg", color: "white" }} />
        </Button>
        <Text className="text-xl  text-white mx-auto">
          <ChannelName id={id} />
        </Text>
      </View>
      {!isSuccess ? (
        <ScrollView className="w-[90vw] h-[80vh]">
          <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
        </ScrollView>
      ) : (
        <FlatList
          inverted={true}
          className="flex  w-[90vw] h-[80vh]"
          numColumns={1}
          renderItem={({ item, index }: { item: any; index: number }) => {
            return (
              <ChatMessaage
                refresh={refetch}
                key={index}
                message={item as Message}
              />
            );
          }}
          onEndReached={loadNext}
          data={newMessages}
        ></FlatList>
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
