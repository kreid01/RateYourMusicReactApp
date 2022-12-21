import axios from "axios";
import { Image, Spinner, Text, View } from "native-base";
import { useEffect } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setUser, User } from "../slices/userSlice";
import React, { useRef } from "react";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import Animated from "react-native-reanimated";
import { useGetAllReleasesQuery } from "../generated/graphql";
import { useGetUserQuery } from "../generated/graphql";
import { ArtistName } from "../components/ArtistName";
export const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [data] = useGetUserQuery();
  const { data: user } = data;

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const [result, refetch] = useGetAllReleasesQuery();
  const { data: releases, stale, fetching } = result;

  useEffect(() => {
    dispatch(setUser(user as User));
  }, [user]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const itemSize = 176;

  return (
    <View className="relative min-h-100vh bg-slate-800">
      <View className=" w-[100vw] mt-10">
        <View className="flex flex-row ml-auto mr-10">
          <Text className="mr-5 text-gray-500">Average</Text>
          <Text className="text-gray-500">Rated</Text>
        </View>
      </View>
      {releases ? (
        <Animated.FlatList
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
              <AnimatedTouchable
                style={{ transform: [{ scale }], opacity }}
                onPress={() => navigation.navigate("Recipe", { id: item.id })}
                key={item.id}
                className="w-[90vw] flex flex-row rounded-sm bg-gray-800 shadow-md h-[15vh]  m-2"
              >
                <Image
                  className="w-28 h-28 mx-2 my-auto"
                  alt=""
                  source={{ uri: item.cover }}
                />
                <View>
                  <Text className="text-blue-300 text-lg mt-2  w-[100%]">
                    {item.title}
                  </Text>
                  <ArtistName id={item.id} />
                  <Text className="text-sm text-white">{item.recorded}</Text>

                  <View className="flex flex-row mt-auto mb-3 w-[70%] flex-wrap">
                    {item.genres.map((genre: string, i: number) =>
                      i + 1 !== item.genres.length ? (
                        <Text className="text-xs text-blue-500 ">
                          {genre},{" "}
                        </Text>
                      ) : (
                        <Text className="text-xs text-blue-500">{genre}</Text>
                      )
                    )}
                  </View>
                </View>
                <View className="flex mt-auto flex-row mb-3 ml-auto mr-2">
                  <Text className="mr-5 font-bold w-10 text-blue-500">
                    {item.rating}
                  </Text>
                  <Text className="text-gray-500 w-8">{item.ratingCount}</Text>
                </View>
              </AnimatedTouchable>
            );
          }}
          data={releases.getAllReleases}
          refreshControl={
            <RefreshControl refreshing={fetching} onRefresh={refetch} />
          }
        ></Animated.FlatList>
      ) : (
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      )}
    </View>
  );
};
