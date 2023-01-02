import React from "react";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "native-base";
import { ArtistName } from "./ArtistName/ArtistName";
import { IRelease } from "../conts/Types";

interface Props {
  item: IRelease;
  navigation: any;
  scale: any;
  opacity: any;
}

export const Release: React.FC<Props> = ({
  item,
  navigation,
  scale,
  opacity,
}) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchable
      style={{ transform: [{ scale }], opacity }}
      onPress={() => navigation.navigate("Release", { id: item.id })}
      key={item.id}
      className="w-[90vw] flex flex-row rounded-sm bg-gray-800 shadow-md h-[17vh]  m-2"
    >
      <Image
        className="w-28 h-28 mx-2 my-auto"
        alt=""
        source={{ uri: item.cover }}
      />
      <View>
        <Text className="text-blue-300 text-lg mt-2  w-[90%]">
          {item.title}
        </Text>
        <ArtistName color="text-sky-200" id={item.artistId} />
        <Text className="text-sm text-white">{item.released}</Text>
        <View className="flex flex-row mt-auto mb-3 w-[65%] flex-wrap">
          {item.genres.map((genre: string, i: number) =>
            i + 1 !== item.genres.length ? (
              <Text key={i} className="text-xs text-blue-500 ">
                {genre},{" "}
              </Text>
            ) : (
              <Text key={i} className="text-xs text-blue-500">
                {genre}
              </Text>
            )
          )}
        </View>
      </View>
      <View className="flex mt-auto flex-row mb-3 ml-auto mr-2">
        <Text className="mr-5 font-bold w-10 text-blue-500">
          {item.rating.toFixed(2)}
        </Text>
        <Text className="text-gray-500 w-8">{item.ratingCount}</Text>
      </View>
    </AnimatedTouchable>
  );
};
