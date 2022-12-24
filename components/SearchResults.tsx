import { ScrollView, Image, View, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSearchReleasesQuery } from "../generated/graphql";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  navigation: any;
  search: string;
}

export const SearchResults: React.FC<Props> = ({ search, navigation }) => {
  const debouncedSearch = useDebounce(search, 500);
  const [result] = useSearchReleasesQuery({
    variables: { search: debouncedSearch },
  });

  const { data, fetching } = result;
  return (
    <ScrollView className="h-[90vh] bg-slate-700">
      {data?.searchReleases?.map((release, i) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Release", { id: release?.id as number })
            }
            className="bg-slate-800 m-1 flex flex-row"
            key={i}
          >
            <Image
              alt=""
              className="h-10 w-10 my-2 ml-2"
              source={{ uri: release?.cover as string }}
            />
            <View>
              <Text
                data-cy="search-result"
                className="text-sky-200 font-bold ml-2 mt-1"
              >
                {release?.title}
              </Text>
              <View className="flex flex-row">
                <Text className="text-sky-500 mr-3 text-xs mt-2 ml-2 ">
                  {release?.released}
                </Text>
                {release?.genres?.map((genre, i) => {
                  return i < 2 ? (
                    <Text className="text-sky-200 ml-1 mt-2 text-xs">
                      {genre}{" "}
                    </Text>
                  ) : null;
                })}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
