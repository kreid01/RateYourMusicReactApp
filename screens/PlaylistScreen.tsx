import React from "react";
import {
  View,
  Text,
  Spinner,
  ScrollView,
  Button,
  ArrowBackIcon,
} from "native-base";
import { useGetPlaylistByIdQuery } from "../generated/graphql";
import { PlaylistRelease } from "../components/PlaylistRelease";

export const PlaylistScreen = ({ navigation, route }: any) => {
  const { id } = route;

  const [result] = useGetPlaylistByIdQuery({ variables: { id: 1 } });

  const { data, fetching } = result;

  return (
    <View className="min-h-[100vh] bg-slate-800">
      <View className="pt-16 pb-3 shadow-lg  bg-slate-900  flex flex-row">
        <Button
          accessibilityLabel="back-button"
          className="absolute rounded-full py-3 top-12 left-5 text-white"
          variant="ghost"
          onPress={() => navigation.navigate("Account")}
        >
          <ArrowBackIcon style={{ size: "lg", color: "white" }} />
        </Button>
        <Text className="text-xl text-white mx-auto">
          {data?.getPlaylistById?.title}
        </Text>
      </View>
      {fetching ? (
        <Spinner />
      ) : (
        <ScrollView>
          {data?.getPlaylistById?.contentIds?.map((id) => {
            return <PlaylistRelease id={id as number} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};
