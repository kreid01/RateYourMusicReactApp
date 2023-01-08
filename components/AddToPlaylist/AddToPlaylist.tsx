import { Button, View, Text, AddIcon } from "native-base";
import React, { useState } from "react";
import { Easing } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSelector } from "react-redux";
import {
  useGetUserPlaylistsQuery,
  useUpdatePlaylistMutation,
} from "../../generated/graphql";
import { RootState } from "../../store/store";
import { DisplayAdd } from "../DisplayAdd";

interface Props {
  releaseId: number;
  releaseTitle: string;
}

export const AddToPlaylist: React.FC<Props> = ({ releaseId, releaseTitle }) => {
  const [, updatePlaylist] = useUpdatePlaylistMutation();

  const [progress, setProgress] = useState(0);

  const addedProgress = () => {
    setProgress(0.2);
    if (progress <= 1) {
      setInterval(() => {
        setProgress((prevState) => prevState + 0.2);
      }, 1000);
    }
  };

  const currentUser = useSelector((state: RootState) => state.user.value);

  const [result] = useGetUserPlaylistsQuery({
    variables: { id: currentUser?.id as number },
  });

  const { data } = result;

  return (
    <View>
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
                  }).then(async (data) => {
                    if (data.error) {
                      return data.error;
                    } else {
                      addedProgress();
                    }
                  })
                }
              >
                <AddIcon />
              </Button>
            </View>
          );
        })}
      </Animated.ScrollView>
      {progress <= 1 && progress !== 0 ? (
        <DisplayAdd releaseTitle={releaseTitle} />
      ) : null}
    </View>
  );
};
