import React from "react";
import {
  View,
  Text,
  Spinner,
  ScrollView,
  Button,
  ArrowBackIcon,
  CloseIcon,
} from "native-base";
import {
  useDeletePlaylistMutation,
  useGetPlaylistByIdQuery,
} from "../generated/graphql";
import { PlaylistRelease } from "../components/PlaylistRelease";
import uuid from "react-native-uuid";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";

export const PlaylistScreen = ({ navigation, route }: any) => {
  const { id } = route.params;

  const [result, reexecuteQuery] = useGetPlaylistByIdQuery({
    variables: { id: id as number },
  });

  const refresh = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const [, deletePlaylist] = useDeletePlaylistMutation();

  const { data, fetching } = result;

  return (
    <View className="min-h-[100vh] bg-slate-800">
      <View className="pt-16 pb-3 shadow-lg  bg-slate-900  flex flex-row">
        <Button
          accessibilityLabel="back-button"
          className="absolute rounded-full py-3 top-[60px] left-5 text-white"
          variant="ghost"
          onPress={() => navigation.navigate("Account")}
        >
          <ArrowBackIcon style={{ size: "lg", color: "white" }} />
        </Button>
        <Text className="text-xl text-white mx-auto">
          {data?.getPlaylistById?.title}
        </Text>

        <Button
          className="absolute rounded-full py-3 top-[60px] right-5 text-white"
          variant="ghost"
          onPress={() =>
            deletePlaylist({ id: id as number }).then(async (data) => {
              if (data.error) {
                alert(data.error.message);
              } else {
                refresh();
                navigation.navigate("Account");
              }
            })
          }
        >
          <CloseIcon style={{ size: "lg", color: "red" }} />
        </Button>
      </View>
      {fetching ? (
        <Spinner color="indigo.500" size="lg" className="mx-auto mt-10" />
      ) : (
        <ScrollView>
          {data?.getPlaylistById?.contentIds?.map((releaseId, index) => {
            return (
              <PlaylistRelease
                key={uuid.v4() as string}
                playlistId={id as number}
                contentIds={data.getPlaylistById?.contentIds as number[]}
                navigation={navigation}
                id={releaseId as number}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
