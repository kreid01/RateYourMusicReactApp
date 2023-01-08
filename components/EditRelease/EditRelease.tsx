import { Formik } from "formik";
import { View, Text, Input, Button } from "native-base";
import React, { useState } from "react";
import { useUpdateReleaseMutation } from "../../generated/graphql";
import { ArtistName } from "../ArtistName/ArtistName";
import { CheckIcon, CloseIcon } from "native-base";
import { IRelease } from "../../conts/Types";

interface Props {
  release: IRelease;
  handleEdit: () => void;
}

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
          released: values.released,
          ratingCount: values.ratingCount,
          rating: values.rating,
          cover: values.cover,
          language: values.language,
          genres: values.genres,
          tracks: values.tracks,
        }).then((result) => {
          if (result.error) {
            alert(result.error.message);
          } else {
            console.debug(result);
            handleEdit();
          }
        })
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => {
        return (
          <View>
            <View className="mt-5 ml-5 w-[90%]">
              <View className="mb-2">
                <Input
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  focusOutlineColor="#475569"
                  onChangeText={handleChange("cover")}
                  placeholder="Cover"
                >
                  {release.cover}
                </Input>
              </View>
              <Input
                backgroundColor="#475569"
                borderColor="#475569"
                focusOutlineColor="#475569"
                onChangeText={handleChange("title")}
                className="text-white text-3xl"
              >
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
                    testID="edit-button"
                    onPress={() => handleEdit()}
                  >
                    <CloseIcon color="#D30000" />
                  </Button>
                </View>
              </View>
            </View>

            <View className="mx-5 mt-5 p-5 bg-gray-700 ">
              <View className="flex flex-row">
                <Text className="text-gray-100 mr-8">Type:</Text>
                <Input
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  focusOutlineColor="#475569"
                  width={"64"}
                  height={7}
                  marginTop={-1}
                  onChangeText={handleChange("type")}
                >
                  {release.type}
                </Input>
              </View>
              <View>
                <Text className="text-white">
                  Rating:{" "}
                  <Text className=" text-white font-bold text-lg">
                    {release.rating}
                  </Text>{" "}
                  / 5.0 from{" "}
                  <Text className=" text-white font-bold">
                    {release.ratingCount}
                  </Text>{" "}
                  ratings
                </Text>
              </View>

              <View className="flex flex-row my-2">
                <Text className="text-white mr-1">Released:</Text>
                <Input
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  focusOutlineColor="#475569"
                  width={"64"}
                  height={7}
                  marginTop={-1}
                  onChangeText={handleChange("released")}
                >
                  {release.released}
                </Input>
              </View>

              <View className="flex flex-row justify-between">
                <View className="flex flex-row mt-3 w-[100%] flex-wrap">
                  <Text className="text-white mr-1">Genres:</Text>
                  {release.genres?.map((genre, i) => (
                    <View key={i} className="-mt-1 mb-3 mx-1">
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
                <Text className="text-white">Language: </Text>
                <Input
                  className="text-white"
                  width={"64"}
                  height={7}
                  marginTop={-1}
                  onChangeText={handleChange("language")}
                >
                  {release.language}
                </Input>
              </View>

              <View>
                <Text className="text-white font-bold mb-2 mt-5">
                  Track Listing
                </Text>
                <View className="border-[1px] border-gray-500">
                  {release.tracks?.map((track, i) => {
                    return (
                      <View
                        key={i}
                        className="flex flex-row py-1 border-b-[1px] border-gray-500"
                      >
                        <Text className="text-gray-400 font-bold mx-3">
                          {i + 1}{" "}
                        </Text>
                        <Input
                          width={"72"}
                          className="text-white"
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
        );
      }}
    </Formik>
  );
};
