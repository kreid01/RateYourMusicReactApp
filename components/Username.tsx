import React from "react";
import { Text } from "native-base";
import { useGetUsernameQuery } from "../generated/graphql";

interface Props {
  id: number;
}

export const Username: React.FC<Props> = ({ id }) => {
  const [result] = useGetUsernameQuery({ variables: { id: id } });
  const { data, fetching } = result;

  return !fetching ? <Text>{data?.getUserById?.username}</Text> : null;
};
