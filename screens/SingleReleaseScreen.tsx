import { Button, ScrollView, Spinner, Text, View } from "native-base";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as Animatable from "react-native-animatable";
import { useGetReleaseByIdQuery } from "../generated/graphql";
import { ArtistName } from "../components/ArtistName";
import { EditRelease, Release } from "../components/EditRelease";

export const SingleReleaseScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [result] = useGetReleaseByIdQuery({ variables: { id: id } });
  const { data, fetching } = result;
  const [isEditing, setIsEditing] = useState<boolean>();
  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  if (!fetching) {
    return (
      <ScrollView className="relative">
        <ExpoFastImage
          cacheKey={data?.getReleaseById?.id}
          className="mx-auto h-[50vh] w-[100%]  object-scale-down"
          source={{
            uri: data?.getReleaseById?.cover,
          }}
        />
        <Button
          _hover={{ bg: "amber.400", borderRadius: "100px" }}
          className="absolute mt-10 ml-7 text-white"
          variant="ghost"
          onPress={() => navigation.navigate("Home")}
        ></Button>
        {isEditing ? (
          <Fragment>
            <View className="ml-5">
              <Text className=" text-3xl mt-5 w-[100vw]">
                {data?.getReleaseById?.title}
              </Text>
              <View className="flex flex-row">
                <Text className="text-gray-500">
                  By{" "}
                  <ArtistName
                    color="text-sky-700"
                    id={data?.getReleaseById?.artistId as number}
                  />
                </Text>

                <Button
                  variant="ghost"
                  className="ml-auto mr-8"
                  onPress={() => setIsEditing((prevState) => !prevState)}
                >
                  Edit
                </Button>
              </View>
            </View>

            <Animatable.View className="mx-5 mt-5 p-5 bg-gray-200 ">
              <Animatable.View animation="bounceIn" delay={250}>
                <Text className="text-gray-500">
                  Type: {data?.getReleaseById?.type}
                </Text>
              </Animatable.View>

              <Animatable.View animation="bounceIn" delay={250}>
                <Text className="text-gray-500">
                  Rating:{" "}
                  <Text className="font-bold text-lg">
                    {data?.getReleaseById?.rating}
                  </Text>{" "}
                  / 5.0 from{" "}
                  <Text className="font-bold">
                    {data?.getReleaseById?.ratingCount}
                  </Text>{" "}
                  ratings
                </Text>
              </Animatable.View>

              <Animatable.View animation="bounceIn" delay={250}>
                <Text className="text-gray-500">
                  Released: {data?.getReleaseById?.recorded}
                </Text>
              </Animatable.View>

              <Animatable.View
                animation="bounceIn"
                delay={250}
                className="flex flex-row justify-between"
              >
                <View className="flex flex-row mt-auto w-[100%] flex-wrap">
                  <Text className="text-gray-500 mr-1">Genres:</Text>
                  {data?.getReleaseById?.genres?.map((genre, i) =>
                    i + 1 !== data.getReleaseById?.genres?.length ? (
                      <Text key={i} className="text-blue-500 ">
                        {genre},{" "}
                      </Text>
                    ) : (
                      <Text key={i} className=" text-blue-500">
                        {genre}
                      </Text>
                    )
                  )}
                </View>
              </Animatable.View>

              <Animatable.View animation="bounceIn" delay={350}>
                <Text className="text-gray-500">
                  Language: {data?.getReleaseById?.language}
                </Text>
              </Animatable.View>

              <Animatable.View animation="bounceIn" delay={350}>
                <Text className="text-gray-500 font-bold mb-2 mt-5">
                  Track Listing
                </Text>
                <View className="border-[1px] border-gray-500">
                  {data?.getReleaseById?.tracks?.map((track, i) => {
                    return (
                      <View className="flex flex-row py-1 border-b-[1px] border-gray-500">
                        <Text className="text-gray-500 font-bold mx-3">
                          {i + 1}{" "}
                        </Text>
                        <Text>{track}</Text>
                      </View>
                    );
                  })}
                </View>
              </Animatable.View>
            </Animatable.View>
          </Fragment>
        ) : (
          <EditRelease
            handleEdit={handleEdit}
            release={data?.getReleaseById as Release}
          />
        )}
      </ScrollView>
    );
  } else {
    return <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />;
  }
};
