import { useGetArtistNameQuery } from "../generated/graphql";
import { Spinner, Text } from "native-base";
import React from "react";

interface Props {
  id: number;
}

export const ArtistName: React.FC<Props> = ({ id }) => {
  const [result] = useGetArtistNameQuery({
    variables: { id: id as number },
  });
  const { data, fetching } = result;

  return !fetching ? (
    <Text className="text-blue-200">{data?.getArtistById?.name}</Text>
  ) : (
    <Spinner />
  );
};
