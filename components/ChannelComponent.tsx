import { Image, Spinner, View, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useGetReleaseByIdQuery } from "../generated/graphql";

interface Props {
  id: number;
  title: string;
  navigation: any;
}

export const ChannelComponent: React.FC<Props> = ({
  id,
  title,
  navigation,
}) => {
  const [result] = useGetReleaseByIdQuery({ variables: { id: id } });

  const { data, fetching } = result;

  return fetching ? (
    <Spinner />
  ) : (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Channel", {
          id: id,
        })
      }
      className="flex flex-row mx-auto"
    >
      <Image
        alt=""
        className="h-20 w-20 my-auto"
        source={{ uri: data?.getReleaseById?.cover as string }}
      />
      <View className="ml-2">
        <Text className="text-xl font-bold text-white">{title}</Text>
        <Text className=" text-gray-200">{data?.getReleaseById?.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
