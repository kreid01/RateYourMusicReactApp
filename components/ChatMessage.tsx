import axios from "axios";
import { Text, View, Image } from "native-base";
import React from "react";
import { useQuery } from "react-query";
import { Message, useGetUsernameQuery } from "../generated/graphql";

interface Props {
  message: Message;
}

const getUserImage = async () => {
  const { data: image } = await axios.get("http://192.168.0.120:80/file");
  return image;
};

export const ChatMessaage: React.FC<Props> = ({ message }) => {
  const [result] = useGetUsernameQuery({
    variables: { id: message.posterId as number },
  });

  const { data: image } = useQuery(["user"], getUserImage);

  const { data, fetching } = result;

  return (
    <View className="flex flex-row m-2 ml-6">
      {image ? (
        <Image
          alt=""
          source={{
            uri: "data:image/jpeg;base64," + image,
          }}
          className="w-10 z-5 relative h-10 my-auto rounded-full"
        />
      ) : (
        <Image
          alt=""
          source={{
            uri: "data:image/jpeg;base64," + image,
          }}
          className="w-10 z-5 relative h-10 my-auto rounded-full"
        />
      )}
      <View className="ml-3">
        <View className="flex flex-row">
          <Text className="text-white font-bold">
            {data?.getUserById?.username}
          </Text>
          <Text className="ml-1 text-gray-400">
            {message.postDate?.substring(0, 10)}
          </Text>
        </View>
        <Text className="text-white">{message.content}</Text>
      </View>
    </View>
  );
};
