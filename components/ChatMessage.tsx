import axios from "axios";
import { Text, View, Image, Button } from "native-base";
import React from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  Message,
  useDeleteMessageMutation,
  useGetUsernameQuery,
} from "../generated/graphql";
import { RootState } from "../store/store";

interface Props {
  message: Message;
  refresh: () => void;
}

const getUserImage = async () => {
  const { data: image } = await axios.get("http://192.168.0.120:80/file");
  return image;
};

export const ChatMessaage: React.FC<Props> = ({ message, refresh }) => {
  const [result] = useGetUsernameQuery({
    variables: { id: message.posterId as number },
  });

  const currentUser = useSelector((state: RootState) => state.user.value);
  const { data: image, isFetched } = useQuery(["user"], getUserImage);
  const { data, fetching } = result;

  const [, deleteMessage] = useDeleteMessageMutation();

  return (
    <View className="flex flex-row m-2 ml-6">
      {image && isFetched ? (
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
            uri: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
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
            {message.postDate?.substring(0, 21)}
          </Text>
          {currentUser?.id === message.posterId ? (
            <Button
              onPress={() =>
                deleteMessage({ id: message.id as number }).then(
                  async (data) => {
                    if (data.error) {
                      console.debug(data.error);
                    } else {
                    }
                  }
                )
              }
              variant="ghost"
              className="ml-10"
              size={"sm"}
            >
              Delete
            </Button>
          ) : null}
        </View>
        <Text className="text-white -mt-2">{message.content}</Text>
      </View>
    </View>
  );
};
