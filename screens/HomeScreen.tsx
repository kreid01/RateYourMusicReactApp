import { Spinner, Text, View } from "native-base";
import { RefreshControl } from "react-native";
import React, { useRef, useState } from "react";
import Animated from "react-native-reanimated";
import { Release } from "../components/Release";
import { SearchBar } from "../components/SearchBar";
import { useInfiniteQuery } from "react-query";
import { IRelease } from "../conts/Types";

const getReleases = async ({ pageParam = 0 }) => {
  console.log(pageParam);

  const response = await fetch("http://192.168.0.120:80/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
    query getAllReleases($take: Int!, $skip: Int!) {
      getAllReleases(take: $take, skip: $skip) {
        id
        genres
        artistId
        title
        rating
        released
        ratingCount
        cover
      }
    }
  `,
      variables: {
        take: 5,
        skip: pageParam,
      },
    }),
  });
  const releases = await response.json();
  return releases.data.getAllReleases;
};

export const HomeScreen = ({ navigation }: any) => {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isSuccess } =
    useInfiniteQuery({
      queryKey: ["releases"],
      queryFn: getReleases,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const itemSize = 176;

  return (
    <View className="relative min-h-[100vh] bg-slate-800">
      <SearchBar navigation={navigation} />
      <View className=" w-[100vw] mt-3">
        <View className="flex flex-row ml-auto mr-10">
          <Text className="mr-5 text-gray-500">Average</Text>
          <Text className="text-gray-500">Rated</Text>
        </View>
      </View>
      {isSuccess ? (
        <Animated.FlatList
          className="mb-64"
          accessibilityLabel="releases"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          numColumns={1}
          renderItem={({ item, index }: { item: any; index: number }) => {
            const inputRange = [
              -1,
              0,
              itemSize * index,
              itemSize * (index + 2),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            const opacityInputRange = [
              -1,
              0,
              itemSize * index,
              itemSize * (index + 1),
            ];

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Release
                key={index}
                navigation={navigation}
                scale={scale}
                opacity={opacity}
                item={item}
              />
            );
          }}
          onEndReached={loadNext}
          data={data.pages.flat()}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
        ></Animated.FlatList>
      ) : (
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      )}
    </View>
  );
};
