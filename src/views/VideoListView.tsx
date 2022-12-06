import { isNil } from "lodash";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import FullPageLoadingView from "../components/FullPageLoadingView";
import SpinnerView from "../components/SpinnerView";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { api } from "../lib/api/api";
import VideoItemView from "./VideoItemView";

const fetchVideoList = async (nextPageToken?: string) => {
  const res = await api.fetchPopularVideoList({
    part: "snippet",
    chart: "mostPopular",
    maxResults: 24,
    pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
    regionCode: "KR",
  });

  return res;
};

const VideoListView = () => {
  // searchParams
  const searchParams = useSearchParams()[0];

  // useRef
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "videoList",
    ({ pageParam = undefined }) => fetchVideoList(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    }
  );

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (!hasNextPage) {
      return;
    }

    if (entries[0].isIntersecting) {
      fetchNextPage();
    }
  };
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  if (isLoading) return <FullPageLoadingView />;
  if (isError) return <>{error}</>;
  return (
    <>
      <Pub.Container>
        {data.pages.map((pageData) => {
          return pageData.items.map((video: any, index: number) => {
            return (
              <VideoItemView
                key={`video-list-item-${index}-${video.id}`}
                video={video}
              />
            );
          });
        })}
      </Pub.Container>

      {/* target element */}
      <div ref={targetRef} />

      {/* components */}
      {isFetching && <SpinnerView />}
    </>
  );
};

export default VideoListView;

interface ContentsViewStylePropsType {
  isNoneData: boolean;
}

const Pub = {
  Container: styled.div`
    margin-top: 36px;
    text-align: center;

    display: grid;
    justify-items: center;
    @media screen and (min-width: 1280px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media screen and (max-width: 1279px) and (min-width: 960px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 959px) and (min-width: 640px) {
      grid-template-columns: 1fr 1fr;
    }
  `,
};
