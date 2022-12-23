import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Image, Input, View } from "native-base";
import React, { useState } from "react";
import { Login } from "./Login";

interface Props {}

export const SearchBar: React.FC<Props> = () => {
  const [search, setSearch] = useState();

  return (
    <View className="pt-16 pb-3 shadow-lg  bg-slate-900  flex flex-row">
      <Image
        source={{
          uri: "https://www.creativefabrica.com/wp-content/uploads/2020/02/12/Music-Logo-Graphics-1-10.jpg",
        }}
        alt=""
        className="h-10 rounded-full ml-5 mr-2 w-10"
      />
      <Input
        accessibilityLabel="search"
        testID="search"
        width="65%"
        borderRadius="xl"
        className="text-white"
        focusOutlineColor="white"
        placeholder="Search..."
        InputLeftElement={
          <Icon marginLeft={2} as={<MaterialIcons name="search" />} />
        }
      ></Input>
      <Login />
    </View>
  );
};
