import { useInfiniteQuery } from "react-query";

export const useInfiniteMessageQuery = (query: string, id: number) => {
  const getQuery = async (pageParam: number) => {
    const response = await fetch("http://192.168.0.15:80/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          id: id,
          take: 12,
          skip: pageParam,
        },
      }),
    });
    const releases = await response.json();

    return releases.data.getChatMessages;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isSuccess } =
    useInfiniteQuery({
      queryKey: ["messages"],
      queryFn: ({ pageParam = 1 }) => getQuery(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return { loadNext, data, isFetching, refetch, isSuccess };
};
