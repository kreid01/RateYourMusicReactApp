import { Formik } from "formik";
import { View, Text, Input, Button } from "native-base";
import React, { useState } from "react";
import { useUpdateReleaseMutation } from "../generated/graphql";
import { ArtistName } from "./ArtistName";
import { CheckIcon, CloseIcon } from "native-base";

interface Props {
  release: Release;
  handleEdit: () => void;
}

export type Release = {
  id: number;
  artistId: number;
  title: string;
  type: string;
  recorded: string;
  ratingCount: number;
  rating: number;
  cover: string;
  language: string;
  genres: [string];
  tracks: [string];
};

export const EditRelease: React.FC<Props> = ({ release, handleEdit }) => {
  const [, updateRelease] = useUpdateReleaseMutation();

  return (
    <Formik
      initialValues={release}
      onSubmit={(values) =>
        updateRelease({
          id: values.id,
          title: values.title,
          type: values.type,
          recorded: values.recorded,
          ratingCount: values.ratingCount,
          rating: values.rating,
          cover: values.cover,
          language: values.language,
          genres: values.genres,
          tracks: values.tracks,
        })
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <View className="mt-5 ml-5 w-[90%]">
            <Input onChangeText={handleChange("title")} className=" text-3xl">
              {release.title}
            </Input>
            <View className="flex flex-row">
              <Text className="text-gray-500">
                By{" "}
                <ArtistName
                  color="text-sky-700"
                  id={release.artistId as number}
                />
              </Text>
              <View className="flex flex-row ml-auto">
                <Button
                  className="mb-5"
                  variant="ghost"
                  onPress={() => handleSubmit()}
                >
                  <CheckIcon color="#3BB143" />
                </Button>
                <Button
                  className="mb-5"
                  variant="ghost"
                  onPress={() => handleEdit()}
                >
                  <CloseIcon color="#D30000" />
                </Button>
              </View>
            </View>
          </View>

          <View className="mx-5 mt-5 p-5 bg-gray-200 ">
            <View className="flex flex-row">
              <Text className="text-gray-500 mr-8">Type:</Text>
              <Input
                width={"64"}
                height={7}
                marginTop={-1}
                onChangeText={handleChange("type")}
              >
                {release.type}
              </Input>
            </View>
            <View>
              <Text className="text-gray-500">
                Rating:{" "}
                <Text className="font-bold text-lg">{release.rating}</Text> /
                5.0 from{" "}
                <Text className="font-bold">{release.ratingCount}</Text> ratings
              </Text>
            </View>

            <View className="flex flex-row my-2">
              <Text className="text-gray-500 mr-1">Released:</Text>
              <Input
                width={"64"}
                height={7}
                marginTop={-1}
                onChangeText={handleChange("recorded")}
              >
                {release.recorded}
              </Input>
            </View>

            <View className="flex flex-row justify-between">
              <View className="flex flex-row mt-3 w-[100%] flex-wrap">
                <Text className="text-gray-500 mr-1">Genres:</Text>
                {release.genres?.map((genre, i) => (
                  <View className="-mt-1 mb-3 mx-1">
                    <Input
                      onChangeText={handleChange(`genres[${i}]`)}
                      className="text-blue-500"
                      width={24}
                    >
                      {genre}{" "}
                    </Input>
                  </View>
                ))}
              </View>
            </View>

            <View className="flex flex-row">
              <Text className="text-gray-500">Language: </Text>
              <Input
                className="text-gray-500"
                width={"64"}
                height={7}
                marginTop={-1}
                onChangeText={handleChange("language")}
              >
                {release.language}
              </Input>
            </View>

            <View>
              <Text className="text-gray-500 font-bold mb-2 mt-5">
                Track Listing
              </Text>
              <View className="border-[1px] border-gray-500">
                {release.tracks?.map((track, i) => {
                  return (
                    <View className="flex flex-row py-1 border-b-[1px] border-gray-500">
                      <Text className="text-gray-500 font-bold mx-3">
                        {i + 1}{" "}
                      </Text>
                      <Input
                        width={"72"}
                        onChangeText={handleChange(`tracks[${i}]`)}
                      >
                        {track}
                      </Input>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
