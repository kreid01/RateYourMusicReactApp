import { Image, Spinner, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { SearchBar } from "../components/SearchBar";
import { useGetAllReleasesQuery } from "../generated/graphql";
import { ArtistName } from "../components/ArtistName/ArtistName";

export const NewseScreen = ({ navigation }: any) => {
  const [results] = useGetAllReleasesQuery({
    variables: { skip: 1, take: 20 },
  });

  const { data, fetching } = results;

  console.log(data?.getAllReleases);

  const news = [
    {
      album: data?.getAllReleases ? data?.getAllReleases[10] : null,
      headline: "10 Year Anniversary of Bladee's Eversince",
      article:
        "Bladees eversince delivers a chilling, wintery sound. With whitarmors chilling synthwork combined with bladees iconic vocal style and distinct lyricism deliver a memorable collection of tracks.",
    },
    {
      album: data?.getAllReleases ? data?.getAllReleases[4] : null,
      headline: "New Release of black midis' Hellfire",
    },
  ];

  return (
    <View className="relative min-h-[100vh] bg-slate-800">
      <SearchBar navigation={navigation} />
      {fetching ? (
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      ) : (
        <Animated.FlatList
          className="mb-64"
          accessibilityLabel="releases"
          renderItem={({ item, index }: { item: any; index: number }) => {
            const { album } = item;
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Release", { id: item.id })}
                key={item.id}
                className="w-[98vw]  rounded-sm bg-gray-800 shadow-md  h-[5s0vh]  m-2"
              >
                <View className="ml-2 mb-2">
                  <Text className="text-white text-3xl">{item.headline}</Text>
                  <Text className="text-blue-300  text-xl mt-2  w-[90%]">
                    {album.title}
                  </Text>
                  <ArtistName color="text-sky-200" id={album.artistId} />
                </View>
                <Image
                  className="w-96 h-96 mx-2 mb-auto"
                  alt=""
                  source={{ uri: album.cover }}
                />
                <View className="border-b-2 border-blue-200 pb-2 mx-2">
                  <Text className="ml-auto  mr-2 text-sm text-gray-400">
                    {album.released}
                  </Text>
                  {item.article ? (
                    <Text className="text-white mt-5  border-b-2 border-blue-200">
                      {item.article}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
          data={news}
        ></Animated.FlatList>
      )}
    </View>
  );
};
