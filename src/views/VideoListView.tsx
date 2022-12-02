import { isNil } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import styled, { css } from "styled-components";
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
  // useRef
  const targetRef = useRef<HTMLDivElement>(null);

  // useState
  const [videoList, setVideoList] = useState([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetched,
    isError,
    error,
  } = useInfiniteQuery(
    "videoList",
    ({ pageParam = undefined }) => fetchVideoList(pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined }
  );

  if (isLoading) return <></>;
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
  `,
};
