import React from "react";
import { View, Text, Spinner, ScrollView, Input } from "native-base";
import { useGetAllChannelsQuery } from "../generated/graphql";
import { ChannelComponent } from "../components/ChannelComponent";

export const ChannelScreen = ({ navigation }: any) => {
  const [result] = useGetAllChannelsQuery();

  const { data, fetching } = result;

  return (
    <View className="min-h-[100vh] bg-slate-800">
      <View className="pt-12 pb-3 shadow-lg  bg-slate-900  flex flex-row">
        <Text className="text-3xl text-white mx-auto">Channels</Text>
      </View>
      {fetching ? (
        <Spinner />
      ) : (
        <ScrollView>
          {data?.getAllChannels?.map((channel) => {
            return (
              <View
                key={channel?.id}
                className="w-[90vw] flex flex-row rounded-sm bg-gray-800 shadow-md h-[10vh]  m-2"
              >
                <ChannelComponent
                  navigation={navigation}
                  title={channel?.title as string}
                  id={channel?.id as number}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
