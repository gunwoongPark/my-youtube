import axios from "axios";
import { isNil } from "lodash";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import searchApi from "../lib/api/search";
import videoApi from "../lib/api/video";
import { queryKeys } from "../react-query/queryKey";

const fetchPopularVideoList = async (nextPageToken?: string) => {
  const res = await videoApi.fetchPopularVideoList({
    part: "snippet",
    chart: "mostPopular",
    maxResults: 24,
    pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
    regionCode: "KR",
  });

  return res;
};

const fetchSearchVideoList = async (
  keyword: string,
  nextPageToken?: string
) => {
  const res = await searchApi.fetchSearchVideoList({
    part: "snippet",
    maxResults: 24,
    q: keyword,
    pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
    regionCode: "KR",
    type: "video",
  });

  return res;
};

const useVideoList = (keyword: string | null) => {
  // navigate
  const navigate = useNavigate();

  const [isExceeding, setIsExceeding] = useState<boolean>(false);

  const {
    data: videoList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery(
    keyword ? [queryKeys.searchVideoList, keyword] : queryKeys.popularVideoList,
    ({ pageParam = undefined }) =>
      keyword
        ? fetchSearchVideoList(keyword, pageParam)
        : fetchPopularVideoList(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
      onError(error: unknown) {
        if (axios.isAxiosError(error)) {
          switch (error.response?.status) {
            case 403:
              setIsExceeding(true);
              break;

            case 404:
              navigate({
                pathname: "/error",
                search: "?code=404&message=Not Found",
              });
              break;

            case 500:
              navigate({
                pathname: "/error",
                search: "?code=500&message=Internal Server Error",
              });
              break;

            default:
              navigate({
                pathname: "/error",
                search:
                  "?code=UNKNOWN&message=Sorry, an unknown error occurred.",
              });
          }
        }
      },
    }
  );

  return {
    videoList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isExceeding,
  };
};

export default useVideoList;
