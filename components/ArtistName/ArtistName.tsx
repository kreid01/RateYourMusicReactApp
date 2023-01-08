import { useGetArtistNameQuery } from "../../generated/graphql";
import { Text, Spinner } from "native-base";
import React from "react";

interface Props {
  id: number;
  color: string;
}

export const ArtistName: React.FC<Props> = ({ id, color }) => {
  const [result] = useGetArtistNameQuery({
    variables: { id: id as number },
  });
  const { data, fetching } = result;

  return !fetching ? (
    <Text testID="artist-name" className={`${color} font-bold`}>
      {data?.getArtistById?.name}
    </Text>
  ) : (
    <Spinner testID="spinner" />
  );
};
