import { View, Text, Image } from "native-base";
import React from "react";
import { useGetReleaseByIdQuery } from "../generated/graphql";
import { ArtistName } from "./ArtistName/ArtistName";

interface Props {
  id: number;
}

export const PlaylistRelease: React.FC<Props> = ({ id }) => {
  const [result] = useGetReleaseByIdQuery({ variables: { id: id as number } });

  const { data: release, fetching } = result;

  return (
    <View className="w-[90vw] flex flex-row rounded-sm bg-gray-800 shadow-md h-[13vh]  m-2">
      <Image
        className="w-24 h-24 mx-2 my-auto"
        alt=""
        source={{ uri: release?.getReleaseById?.cover as string }}
      />
      <View>
        <Text className="text-blue-300 text-lg mt-2  w-[90%]">
          {release?.getReleaseById?.title}
        </Text>
        <ArtistName
          color="text-sky-200"
          id={release?.getReleaseById?.artistId as number}
        />
        <Text className="text-sm text-white">
          {release?.getReleaseById?.released}
        </Text>
      </View>
    </View>
  );
};
