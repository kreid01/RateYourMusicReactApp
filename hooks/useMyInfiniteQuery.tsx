import { useInfiniteQuery } from "react-query";

export const useMyInfiniteQuery = (query: string) => {
  const getReleases = async (pageParam: number) => {
    const response = await fetch("http://192.168.0.15:80/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          take: 8,
          skip: pageParam,
        },
      }),
    });
    const releases = await response.json();

    return releases.data.getAllReleases;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, refetch, isSuccess } =
    useInfiniteQuery({
      queryKey: ["queryResult"],
      queryFn: ({ pageParam = 1 }) => getReleases(pageParam),
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
