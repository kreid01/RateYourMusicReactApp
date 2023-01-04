import { View, Text, Image, Button, CloseIcon, MinusIcon } from "native-base";
import { Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useGetReleaseByIdQuery,
  useUpdatePlaylistMutation,
} from "../generated/graphql";
import { ArtistName } from "./ArtistName/ArtistName";
import Icon, { Icons } from "./Icons";

interface Props {
  id: number;
  navigation: any;
  playlistId: number;
  refresh: () => void;
  contentIds: number[];
}

export const PlaylistRelease: React.FC<Props> = ({
  id,
  playlistId,
  navigation,
  refresh,
  contentIds,
}) => {
  const [result] = useGetReleaseByIdQuery({ variables: { id: id as number } });

  const [, updatePlaylist] = useUpdatePlaylistMutation();

  const renderRight = (progressAnimatedValue: any, dragAnimatedValue: any) => {
    const translateX = dragAnimatedValue.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1],
    });

    const style = {
      transform: [
        {
          translateX,
        },
      ],
    };

    return (
      <View className="bg-red-500 w-[95vw] h-[9vh] mr-3 mt-1">
        <Animated.Text className="ml-auto my-auto mr-5 text-xl">
          <Icon type={Icons.Feather} name="trash" color="white" />
        </Animated.Text>
      </View>
    );
  };

  const handleRemove = (event: any) => {
    const newArr = [...contentIds];
    const i = newArr.indexOf(id);
    newArr.splice(i);

    updatePlaylist({
      id: playlistId as number,
      contentIds: newArr as number[],
    }).then(async (data) => {
      if (data.error) {
        alert(data.error.message);
      } else {
        refresh();
      }
    });
  };

  const { data: release, fetching } = result;

  return (
    <Swipeable
      overshootRight={false}
      onSwipeableRightOpen={() => handleRemove(id)}
      renderRightActions={renderRight}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Release", { id: id })}
        className="w-[95vw] flex flex-row rounded-sm bg-gray-800 shadow-md h-[9vh] mx-auto  m-1"
      >
        <Image
          className="w-16 h-16 mx-2 my-auto"
          alt=""
          source={{ uri: release?.getReleaseById?.cover as string }}
        />
        <View>
          <Text className="text-blue-300  mt-2  w-[90%]">
            {release?.getReleaseById?.title}
          </Text>
          <ArtistName
            color="text-sky-200"
            id={release?.getReleaseById?.artistId as number}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
