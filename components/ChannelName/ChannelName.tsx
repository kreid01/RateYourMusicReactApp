import React from "react";
import { useGetChannelNameQuery } from "../../generated/graphql";
import { Text } from "native-base";

interface Props {
  id: number;
}

export const ChannelName: React.FC<Props> = ({ id }) => {
  const [result] = useGetChannelNameQuery({ variables: { id: id as number } });

  const { data, fetching } = result;

  return !fetching ? <Text>{data?.getChannelById?.title}</Text> : null;
};
