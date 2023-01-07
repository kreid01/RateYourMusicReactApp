import React, { useState } from "react";
import { Animated, View, Text } from "react-native";

export const DisplayAdd = ({ releaseTitle }: { releaseTitle: string }) => {
  const progressBar = useState(new Animated.Value(0))[0];

  useState(() => {
    Animated.timing(progressBar, {
      toValue: 372,
      duration: 2250,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View className=" bg-gray-700 h-8 w-[90vw]">
      <Animated.View
        style={{
          width: progressBar,
        }}
        className="absolute border-2 border-red-500"
      />
      <Text className="text-white mx-auto my-auto">
        {releaseTitle} added to playlist{" "}
      </Text>
    </View>
  );
};
