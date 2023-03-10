import { Spinner, View, Text, Image } from "native-base";
import React from "react";
import { useGetReleaseReviewsQuery } from "../generated/graphql";
import { Username } from "./Username";

interface Props {
  id: number;
}

export const ReleaseReviews: React.FC<Props> = ({ id }) => {
  const [result] = useGetReleaseReviewsQuery({ variables: { id: id } });
  const { data, fetching } = result;

  return !fetching ? (
    <View className="mx-5">
      {data?.getReleaseReviews &&
        data?.getReleaseReviews?.map((review) => {
          return (
            <View className="border-sky-700 pb-3 border-b-[1px]">
              <View className="  flex flex-row bg-gray-700 h-8">
                <Image className="w-8 h-8" alt="" source={{ uri: "" }} />
                <Text className="my-auto ml-2 font-bold text-sky-200">
                  <Username id={review?.posterId as number} />
                </Text>
                <Text className="ml-3 text-sky-300 my-auto">
                  {review?.postDate?.substring(0, 4)}
                </Text>
                <Text className="text-white ml-auto mr-2 my-auto">
                  {review?.rating}/5
                </Text>
              </View>

              <Text className="my-1 text-white font-bold">
                {review?.title}{" "}
              </Text>
              <Text className="text-white">{review?.description}</Text>
            </View>
          );
        })}
    </View>
  ) : (
    <Spinner />
  );
};
