import { Spinner, Text, View } from "native-base";
import { RefreshControl } from "react-native";
import React, { useRef, useState } from "react";
import Animated from "react-native-reanimated";
import { Release } from "../components/Release";
import { SearchBar } from "../components/SearchBar";
import { useMyInfiniteQuery } from "../hooks/useMyInfiniteQuery";

const getAllReleasesQuery = `
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
`;

export const HomeScreen = ({ navigation }: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const itemSize = 176;

  const { isSuccess, data, isFetching, refetch, loadNext } =
    useMyInfiniteQuery(getAllReleasesQuery);

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
          data={data?.pages.flat()}
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
