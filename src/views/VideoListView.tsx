import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import FullPageLoadingView from "../components/FullPageLoadingView";
import SpinnerView from "../components/SpinnerView";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useVideoList from "../hooks/useVideoList";
import VideoItemView from "./VideoItemView";

const VideoListView = () => {
  // searchParams
  const searchParams = useSearchParams()[0];

  // useRef
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    videoList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isExceeding,
  } = useVideoList(searchParams.get("keyword"));

  useEffect(() => {
    console.log(videoList);
  }, [videoList]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!hasNextPage) {
        return;
      }

      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  if (isLoading) return <FullPageLoadingView />;
  if (isExceeding)
    return <Pub.Container isFlex={isExceeding}>Exceeding Error</Pub.Container>;
  return (
    <>
      <Pub.Container isFlex={!videoList.pages[0].items.length}>
        {videoList.pages.map((pageData) => {
          if (!!pageData.items.length) {
            return pageData.items.map((video: any) => (
              <VideoItemView
                key={`video-list-item-${video.id.videoId}`}
                video={video}
              />
            ));
          }
          return <div className="none-data">None Data</div>;
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
  isFlex: boolean;
}

const Pub = {
  Container: styled.div<ContentsViewStylePropsType>`
    margin-top: 36px;
    text-align: center;

    ${({ isFlex }) => {
      if (isFlex) {
        return css`
          display: flex;
          justify-content: center;
        `;
      } else {
        return css`
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
        `;
      }
    }}
  `,
};
