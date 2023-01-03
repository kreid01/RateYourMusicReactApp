import React, { useState } from "react";
import { Button, View, Image, Text } from "native-base";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "react-query";

const getUserImage = async () => {
  const { data: image } = await axios.get("http://192.168.0.120:80/file");
  return image;
};

export const UserScreen = () => {
  const [file, setFile] = useState<any>();
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: image } = useQuery(["user"], getUserImage);

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

  return (
    <View className="h-[100vh] bg-slate-800">
      <View className="mt-16 relative w-[90%] flex flex-row rounded-2xl bg-gray-700 p-3 mx-auto">
        {(file || image) && (
          <Image
            alt=""
            source={{
              uri: "data:image/jpeg;base64," + image,
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
    </View>
  );
};
