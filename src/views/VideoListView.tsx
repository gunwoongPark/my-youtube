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
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "videoList",
    ({ pageParam = undefined }) => fetchVideoList(pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined }
  );

  useEffect(() => {
    console.log(data);
    if (!!data) {
      // if (data.pages.items) {
      // }
      // setVideoList((prevVideoList) => [...prevVideoList, ...data.pages?.items]);
    }

    // if (!!data.pages.) {
    //   setVideoList(data.pages);
    // }
  }, [data]);

  if (isLoading) return <></>;
  if (isError) return <>{error}</>;

  return (
    <>
      <Pub.Container>
        {/* {(() => {
          if (!isInit.current && isFetchLoading) {
            return <FullPageLoadingView />;
          } else if (isExceeding) {
            return <div>Exceeding Error</div>;
          } else {
            if (!!videoList.length) {
              return videoList.map((video, index) => (
                <VideoItemView
                  key={`video-list-item-${index}-${video.id}`}
                  video={video}
                />
              ));
            }
            return <span>NONE VIDEO</span>;
          }
        })()} */}
      </Pub.Container>

      {/* target element */}
      <div ref={targetRef} />

      {/* components */}
      {/* {isInit.current && isFetchLoading && <SpinnerView />} */}
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
