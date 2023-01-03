import { Image } from "native-base";
import React from "react";
import { useGetReleaseCoverQuery } from "../generated/graphql";

interface Props {
  id: number;
}

export const ReleaseCover: React.FC<Props> = ({ id }) => {
  const [result] = useGetReleaseCoverQuery({ variables: { id: id as number } });

  const { data, fetching } = result;

  return !fetching ? (
    <Image
      className="h-10 w-10"
      source={{ uri: data?.getReleaseById?.cover as string }}
      alt=""
    />
  ) : null;
};
