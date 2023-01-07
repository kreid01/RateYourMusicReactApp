import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Image, Input, View } from "native-base";
import React, { useState } from "react";
import { Login } from "./Login";
import { SearchResults } from "./SearchResults";

interface Props {
  navigation: any;
}

export const SearchBar: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <View>
      <View className="pt-16 pb-3 shadow-lg  bg-slate-900  flex flex-row">
        <Image
          source={{
            uri: "https://www.creativefabrica.com/wp-content/uploads/2020/02/12/Music-Logo-Graphics-1-10.jpg",
          }}
          alt=""
          className="h-10 rounded-full ml-5 mr-2 w-10"
        />
        <Input
          borderColor="trueGray.700"
          accessibilityLabel="search"
          testID="search"
          width="65%"
          borderRadius="xl"
          className="text-white"
          onChangeText={(text) => setSearch(text)}
          focusOutlineColor="gray"
          placeholder="Search..."
          InputLeftElement={
            <Icon marginLeft={2} as={<MaterialIcons name="search" />} />
          }
        ></Input>
        <Login />
      </View>
      {search.length > 0 ? (
        <SearchResults navigation={navigation} search={search} />
      ) : null}
    </View>
  );
};
