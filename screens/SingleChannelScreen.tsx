import React, { useState } from "react";
import {
  View,
  Text,
  Spinner,
  ScrollView,
  Input,
  Button,
  ArrowBackIcon,
} from "native-base";
import {
  Message,
  useGetChatMessagesQuery,
  usePostMessageMutation,
} from "../generated/graphql";
import { ChatMessaage } from "../components/ChatMessage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const SingleChannelScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [result] = useGetChatMessagesQuery({ variables: { id: id } });

  const { data, fetching } = result;

  const [message, setMessage] = useState<string>("");
  const currentUser = useSelector((state: RootState) => state.user.value);

  const [, postMessage] = usePostMessageMutation();

  return (
    <View className="min-h-[100vh] bg-slate-800">
      <View className="pt-12 pb-3 shadow-lg  bg-slate-900  flex flex-row">
        <Button
          accessibilityLabel="back-button"
          className="absolute rounded-full py-3 top-12 left-5 text-white"
          variant="ghost"
          onPress={() => navigation.navigate("Channels")}
        >
          <ArrowBackIcon style={{ size: "lg", color: "white" }} />
        </Button>
        <Text className="text-3xl text-white mx-auto">Channel</Text>
      </View>
      {fetching ? (
        <Spinner />
      ) : (
        <ScrollView className="flex w-[90vw] flex-col-reverse">
          {data?.getChatMessages?.map((message, i) => {
            return <ChatMessaage key={i} message={message as Message} />;
          })}
        </ScrollView>
      )}
      <View className="my-8 w-[90vw] mx-auto">
        <Input
          placeholder="Message"
          borderColor="#475569"
          focusOutlineColor="#475569"
          className="h-10  text-white"
          onChangeText={(text) => setMessage(text)}
          InputRightElement={
            <Button
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
    </View>
  );
};
