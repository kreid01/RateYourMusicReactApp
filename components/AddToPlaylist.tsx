import { MaterialIcons } from "@expo/vector-icons";
import { Button, View, Text, AddIcon, ScrollView } from "native-base";
import React, { useState } from "react";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSelector } from "react-redux";
import {
  useGetUserPlaylistsQuery,
  useUpdatePlaylistMutation,
} from "../generated/graphql";
import { RootState } from "../store/store";

interface Props {
  releaseId: number;
}

export const AddToPlaylist: React.FC<Props> = ({ releaseId }) => {
  const [, updatePlaylist] = useUpdatePlaylistMutation();

  const currentUser = useSelector((state: RootState) => state.user.value);

  const [result] = useGetUserPlaylistsQuery({
    variables: { id: currentUser?.id as number },
  });

  const { data, fetching } = result;

  return (
    <Animated.ScrollView
      entering={FadeInUp.duration(200)}
      exiting={FadeInUp.duration(200)}
      className="bg-gray-800 w-[90vw] mt-5  h-[20vh]"
    >
      {data?.getUserPlaylists?.map((playlist) => {
        return (
          <View
            key={playlist?.id}
            className="flex my-1 w-[85vw]  mx-auto flex-row bg-gray-700"
          >
            <Text className="text-white text-lg mx-2 my-auto">
              {playlist?.title}
            </Text>
            <Button
              className="ml-auto"
              variant="ghost"
              onPress={() =>
                updatePlaylist({
                  id: playlist?.id as number,
                  contentIds: [
                    ...(playlist?.contentIds as number[]),
                    releaseId as number,
                  ],
                })
              }
            >
              <AddIcon />
            </Button>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};
