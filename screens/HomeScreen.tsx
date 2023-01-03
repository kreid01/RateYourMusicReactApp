import { Spinner, Text, View } from "native-base";
import { RefreshControl } from "react-native";
import React, { useRef } from "react";
import Animated from "react-native-reanimated";
import { useGetAllReleasesQuery } from "../generated/graphql";
import { Release } from "../components/Release";
import { SearchBar } from "../components/SearchBar";
export const HomeScreen = ({ navigation }: any) => {
  const [result, reexecuteQuery] = useGetAllReleasesQuery();
  const { data: releases, stale, fetching } = result;

  const refresh = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
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
      {releases ? (
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
          data={releases.getAllReleases}
          refreshControl={
            <RefreshControl refreshing={fetching} onRefresh={refresh} />
          }
        ></Animated.FlatList>
      ) : (
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      )}
    </View>
  );
};
