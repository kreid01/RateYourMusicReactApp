import { Spinner, View, Text } from "native-base";
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
      <View className="flex flex-row bg-gray-300 h-8">
        <Text className="my-auto ml-2 font-bold text-sky-800">
          <Username id={data?.getReleaseReviews?.posterId as number} />
        </Text>
        <Text className="ml-3 text-sky-600 my-auto">
          {data?.getReleaseReviews?.postDate?.substring(0, 4)}
        </Text>
        <Text className=" ml-auto mr-2 my-auto">
          {data?.getReleaseReviews?.rating}/5
        </Text>
      </View>

      <Text className="my-1">{data?.getReleaseReviews?.title} </Text>
      <Text>{data?.getReleaseReviews?.description}</Text>
    </View>
  ) : (
    <Spinner />
  );
};
