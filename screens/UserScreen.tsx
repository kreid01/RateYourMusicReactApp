import React, { useState } from "react";
import {
  Button,
  View,
  Image,
  Text,
  Input,
  FormControl,
  Box,
  Center,
  FlatList,
} from "native-base";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "react-query";
import {
  useGetUserPlaylistsQuery,
  usePostPlaylistMutation,
} from "../generated/graphql";
import { ReleaseCover } from "../components/ReleaseCover";
import { RefreshControl, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const getUserImage = async () => {
  const { data: image } = await axios.get("http://192.168.0.120:80/file");
  return image;
};

export const UserScreen = ({ navigation }: any) => {
  const [file, setFile] = useState<any>();
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: image } = useQuery(["user"], getUserImage);

  const [result, reexecuteQuery] = useGetUserPlaylistsQuery({
    variables: { id: currentUser?.id as number },
  });

  const refresh = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const { data, fetching } = result;

  const editImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    await axios.post("http://192.168.0.120:80/file", file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const initialValues = {
    title: "",
  };

  const [, postPlaylist] = usePostPlaylistMutation();

  return (
    <View className="h-[100vh] bg-slate-800">
      <View className="mt-16 relative w-[90%] flex flex-row rounded-2xl bg-gray-700 p-3 mx-auto">
        {file || image ? (
          <Image
            alt=""
            source={{
              uri: "data:image/jpeg;base64," + image,
            }}
            className="w-20 z-5 relative h-20 my-auto rounded-full"
          />
        ) : (
          <Image
            alt=""
            source={{
              uri: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
            }}
            className="w-20 z-5 relative h-20 my-auto rounded-full"
          />
        )}

        <View className="ml-5">
          <Text className="text-white text-xl font-bold">
            {currentUser?.username}
          </Text>

          <View className="flex flex-row ml-32  mt-5 justify-around">
            <Button variant="ghost" onPress={pickImage}>
              Edit
            </Button>
            <Button
              variant="ghost"
              colorScheme={"cyan"}
              onPress={() => editImage()}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
      <View className="ml-5 mt-5">
        <Text className="text-3xl text-white ">YOUR PLAYLISTS</Text>

        <FlatList
          className="mt-5 max-h-[27vh]"
          numColumns={1}
          data={data?.getUserPlaylists}
          refreshControl={
            <RefreshControl refreshing={fetching} onRefresh={refresh} />
          }
          renderItem={({ item }: any) => {
            return (
              <TouchableOpacity
                key={item?.id}
                onPress={() =>
                  navigation.navigate("Playlist", { id: item?.id })
                }
                className="bg-gray-700 my-1 w-[90vw] flex flex-row "
              >
                <Text className="text-white m-3 text-xl">{item?.title}</Text>
                <View className="my-auto flex flex-row">
                  {item?.contentIds
                    ? item?.contentIds.map((id: number, index: number) => {
                        if (index < 6)
                          return <ReleaseCover key={index} id={id as number} />;
                      })
                    : null}
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
        {open ? (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              postPlaylist({
                posterId: currentUser?.id as number,
                title: values.title,
              }).then((result) => {
                if (result.error) {
                  console.debug(result.error.message);
                } else if (result.data) {
                  handleClick();
                  refresh();
                }
              });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <Animated.View entering={FadeInUp}>
                <Center
                  w="94.5%"
                  marginBottom={10}
                  className=" mt-5  bg-slate-700"
                >
                  <Box safeArea p="2" w="90%" className="-mt-5" maxW="320">
                    <FormControl>
                      <FormControl.Label _text={{ color: "coolGray.100" }}>
                        Title
                      </FormControl.Label>
                      <Input
                        accessibilityLabel="review-title"
                        selectionColor={"white"}
                        className="text-white"
                        backgroundColor="#475569"
                        borderColor="#475569"
                        focusOutlineColor="#475569"
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title}
                      />
                    </FormControl>
                    <View className="flex mt-5 flex-row">
                      <Button
                        onPress={() => handleClick()}
                        className="mr-2"
                        bgColor="blue.400"
                      >
                        Cancel
                      </Button>
                      <Button onPress={() => handleSubmit()} bgColor="blue.400">
                        Create
                      </Button>
                    </View>
                  </Box>
                </Center>
              </Animated.View>
            )}
          </Formik>
        ) : (
          <Button
            onPress={() => handleClick()}
            bgColor="blue.400"
            className="w-32 m-5 ml-0"
          >
            Create Playlist
          </Button>
        )}
      </View>
    </View>
  );
};
