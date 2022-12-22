import React, { useState } from "react";
import { Formik } from "formik";
import {
  Input,
  Heading,
  Button,
  Radio,
  View,
  Text,
  ScrollView,
} from "native-base";
import {
  usePostReleaseMutation,
  useSearchArtistsQuery,
} from "../generated/graphql";

export const CreateReleaseScreen = () => {
  type MultiValues = {
    genres: string[];
    singleGenre: string;
    tracks: string[];
    singleTrack: string;
  };

  const [multiValues, setMultiValues] = useState<MultiValues>({
    genres: [],
    singleGenre: "",
    tracks: [],
    singleTrack: "",
  });

  const [search, setSearch] = useState<string>("");
  const [artistId, setArtistId] = useState(0);
  const [open, setOpen] = useState(true);

  const addGenre = () => {
    setMultiValues((prevState) => ({
      ...prevState,
      genres: [...(prevState.genres as Array<string>), multiValues.singleGenre],
      singleGenre: "",
    }));
  };

  const addTrack = () => {
    setMultiValues((prevState) => ({
      ...prevState,
      tracks: [...(prevState.tracks as Array<string>), multiValues.singleTrack],
      singleTrack: "",
    }));
  };

  const selectArtist = (id: number) => {
    setArtistId(id);
    setOpen(false);
  };

  const removeGenre = (index: number) => {
    const changeArr = [...multiValues.genres];
    changeArr.splice(index, 1);
    setMultiValues((prevState) => ({
      ...prevState,
      genres: changeArr,
    }));
  };

  const removeTrack = (i: number) => {
    const changeArr = [...multiValues.tracks];
    changeArr.splice(i, 1);
    setMultiValues((prevState) => ({
      ...prevState,
      tracks: changeArr,
    }));
  };

  const [, postRelease] = usePostReleaseMutation();
  const [result] = useSearchArtistsQuery({
    variables: { search: search as string },
  });

  const { data: artists, fetching } = result;

  const initialValues = {
    title: "",
    type: "",
    cover: "",
    language: "",
    recorded: "",
  };

  return (
    <View className="h-[100vh] pt-20 bg-slate-800 ">
      <Heading
        size="lg"
        marginLeft={10}
        fontWeight="600"
        color="coolGray.100"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Post New Release
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          postRelease({
            ...values,
            genres: multiValues.genres,
            tracks: multiValues.tracks,
            artistId: artistId,
          })
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScrollView
            keyboardShouldPersistTaps="always"
            paddingTop="6"
            automaticallyAdjustKeyboardInsets={true}
          >
            <View className="mx-10   overflow-y-scroll">
              <Input
                my={2}
                backgroundColor="#475569"
                borderColor="#475569"
                focusOutlineColor="#475569"
                placeholder="Title"
                className="h-10 text-white"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value-={values.title}
              />
              <Input
                my={2}
                backgroundColor="#475569"
                borderColor="#475569"
                focusOutlineColor="#475569"
                placeholder="Artist"
                className="h-10 text-white"
                onChangeText={(text) => setSearch(text)}
                value={search}
              />
              {open &&
              artists?.searchArtists &&
              artists?.searchArtists.length > 0 ? (
                <View className="w-[100%] -mt-3 bg-slate-700">
                  {artists?.searchArtists?.map((artist) => {
                    return (
                      <View className="flex justify-between rounded-b-md shadow-lg w-[100%] flex-row mt-3  bg-slate-700 z-10">
                        <Text className="text-white ml-2">{artist?.name}</Text>
                        <Button
                          onPress={() => selectArtist(artist?.id as number)}
                          className="-mt-3"
                          variant="ghost"
                        >
                          Select
                        </Button>
                      </View>
                    );
                  })}
                </View>
              ) : null}
              <Input
                my={2}
                backgroundColor="#475569"
                borderColor="#475569"
                className="text-white"
                focusOutlineColor="#475569"
                placeholder="Genres"
                onBlur={handleBlur("genres")}
                value={multiValues.singleGenre}
                onChangeText={(text) =>
                  setMultiValues((prevState) => ({
                    ...prevState,
                    singleGenre: text,
                  }))
                }
                InputRightElement={
                  <Button bgColor="#1e293b" onPress={() => addGenre()}>
                    Add
                  </Button>
                }
              />
              <View>
                {multiValues?.genres.map((genre, index) => {
                  return (
                    <View className="flex flex-row justify-between" key={index}>
                      <Text className="text-white font-semibold w-[70%] text-md mx-2 my-2 border-b-[1px] border-gray-200">
                        - {genre}
                      </Text>
                      <Button
                        variant="ghost"
                        className="-mt-1"
                        onPress={() => removeGenre(index)}
                      >
                        Remove
                      </Button>
                    </View>
                  );
                })}
              </View>
              <Input
                backgroundColor="#475569"
                borderColor="#475569"
                focusOutlineColor="#475569"
                placeholder="Tracks"
                className="text-white"
                onBlur={handleBlur("tracks")}
                value={multiValues.singleTrack}
                my={2}
                onChangeText={(text) =>
                  setMultiValues((prevState) => ({
                    ...prevState,
                    singleTrack: text,
                  }))
                }
                InputRightElement={
                  <Button bgColor="#1e293b" onPress={() => addTrack()}>
                    Add
                  </Button>
                }
              />
              <View>
                {multiValues?.tracks.map((track, i) => {
                  return (
                    <View className="flex flex-row justify-between" key={i}>
                      <Text className="text-white font-semibold text-md mx-2 my-2  max-w-[70%]">
                        {i + 1}. {track}
                      </Text>
                      <Button
                        variant="ghost"
                        className="-mt-1"
                        onPress={() => removeTrack(i)}
                      >
                        Remove
                      </Button>
                    </View>
                  );
                })}
              </View>
              <Input
                backgroundColor="#475569"
                borderColor="#475569"
                focusOutlineColor="#475569"
                placeholder="Cover"
                className="h-10 w-[100vw] text-white"
                my={2}
                onChangeText={handleChange("cover")}
                onBlur={handleBlur("cover")}
                value-={values.cover}
              />
              <Input
                backgroundColor="#475569"
                borderColor="#475569"
                focusOutlineColor="#475569"
                placeholder="Language"
                className="h-10 text-white w-[100vw]"
                my={2}
                onChangeText={handleChange("language")}
                onBlur={handleBlur("language")}
                value-={values.language}
              />
              <Radio.Group
                className=" text-sm"
                name="type"
                my={2}
                accessibilityLabel="Type"
                value={values.type}
                onChange={handleChange("type")}
              >
                <Radio colorScheme="white" value={"true"} my={1}>
                  <Text className="text-white">Album</Text>
                </Radio>
                <Radio colorScheme="white" value={"false"} my={1}>
                  <Text className="text-white">Single</Text>
                </Radio>
              </Radio.Group>

              <Button
                spinnerPlacement="end"
                bgColor="#94a3b8"
                isLoadingText="Submitting"
                onPress={() => handleSubmit()}
              >
                Create
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};
