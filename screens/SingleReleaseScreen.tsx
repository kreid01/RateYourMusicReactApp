import {
  ArrowBackIcon,
  Button,
  ScrollView,
  Spinner,
  Text,
  View,
} from "native-base";
//@ts-ignore
import ExpoFastImage from "expo-fast-image";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as Animatable from "react-native-animatable";
import { useGetReleaseByIdQuery } from "../generated/graphql";
import { ArtistName } from "../components/ArtistName/ArtistName";
import { EditRelease } from "../components/EditRelease/EditRelease";
import { IRelease } from "../conts/Types";
import { ReleaseReviews } from "../components/ReleaseReviews";
import { CreateReview } from "../components/CreateReview";

export const SingleReleaseScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const currentUser = useSelector((state: RootState) => state.user.value);

  const [result, reexecuteQuery] = useGetReleaseByIdQuery({
    variables: { id: id },
  });
  const { data, fetching } = result;

  const refresh = () => {
    reexecuteQuery({ variables: { id: id }, requestPolicy: "network-only" });
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
    refresh();
  };

  if (!fetching) {
    return (
      <ScrollView
        className="relative bg-slate-800"
        keyboardShouldPersistTaps="always"
        automaticallyAdjustKeyboardInsets={true}
      >
        <ExpoFastImage
          cacheKey={data?.getReleaseById?.id}
          className="mx-auto h-[50vh] w-[100%]  object-scale-down"
          source={{
            uri: data?.getReleaseById?.cover,
          }}
        />
        <Button
          className="absolute bg-slate-700 rounded-full py-3 top-12 left-10 text-white"
          variant="ghost"
          onPress={() => navigation.navigate("Home")}
        >
          <ArrowBackIcon style={{ size: "lg", color: "white" }} />
        </Button>
        {!isEditing ? (
          <Fragment>
            <Animatable.View animation="bounceIn" delay={250} className="ml-5 ">
              <Text className="text-white text-3xl mt-5 w-[100vw]">
                {data?.getReleaseById?.title}
              </Text>
              <View className="flex flex-row">
                <Text className="text-gray-400">
                  By{" "}
                  <ArtistName
                    color="text-sky-400"
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
            </Animatable.View>

            <Animatable.View className="mx-5 mt-5 p-5 bg-gray-700 ">
              <Animatable.View animation="fadeInUp" delay={250}>
                <Text className="text-gray-100">
                  Type: {data?.getReleaseById?.type}
                </Text>
              </Animatable.View>

              <Animatable.View animation="fadeInUp" delay={350}>
                <Text className="text-gray-100">
                  Rating:{" "}
                  <Text className="font-bold text-lg">
                    {data?.getReleaseById?.rating}
                  </Text>
                  / 5.0 from{" "}
                  <Text className="font-bold">
                    {data?.getReleaseById?.ratingCount}
                  </Text>
                  ratings
                </Text>
              </Animatable.View>

              <Animatable.View animation="fadeInUp" delay={450}>
                <Text className="text-gray-100">
                  Released: {data?.getReleaseById?.released}
                </Text>
              </Animatable.View>

              <Animatable.View
                animation="fadeInUp"
                delay={550}
                className="flex flex-row justify-between"
              >
                <View className="flex flex-row mt-auto w-[100%] flex-wrap">
                  <Text className="text-gray-100 mr-1">Genres:</Text>
                  {data?.getReleaseById?.genres?.map((genre, i) =>
                    i + 1 !== data.getReleaseById?.genres?.length ? (
                      <Text key={i} className="text-blue-400 ">
                        {genre},{" "}
                      </Text>
                    ) : (
                      <Text key={i} className=" text-blue-400">
                        {genre}
                      </Text>
                    )
                  )}
                </View>
              </Animatable.View>

              <Animatable.View animation="fadeInUp" delay={650}>
                <Text className="text-gray-100">
                  Language: {data?.getReleaseById?.language}
                </Text>
              </Animatable.View>

              <Animatable.View animation="fadeInUp" delay={750}>
                <Text className="text-gray-100 font-bold mb-2 mt-5">
                  Track Listing
                </Text>
                <View className="border-[1px] border-gray-500">
                  {data?.getReleaseById?.tracks?.map((track, i) => {
                    return (
                      <View
                        key={i}
                        className="flex flex-row py-1 border-b-[1px] border-gray-500"
                      >
                        <Text className="text-gray-400 font-bold mx-3">
                          {i + 1}{" "}
                        </Text>
                        <Text className="text-white">{track}</Text>
                      </View>
                    );
                  })}
                </View>
              </Animatable.View>
            </Animatable.View>
            <CreateReview releaseId={id} />
            <ReleaseReviews id={id} />
          </Fragment>
        ) : (
          <EditRelease
            handleEdit={handleEdit}
            release={data?.getReleaseById as IRelease}
          />
        )}
      </ScrollView>
    );
  } else {
    return (
      <View className="h-[100vh] bg-slate-800">
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      </View>
    );
  }
};
