import axios from "axios";
import { isNil } from "lodash";
import { useRef, useState } from "react";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import FullPageLoadingView from "../components/FullPageLoadingView";
import SpinnerView from "../components/SpinnerView";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { api } from "../lib/api/api";
import VideoItemView from "./VideoItemView";

const fetchPopularVideoList = async (nextPageToken?: string) => {
  const res = await api.fetchPopularVideoList({
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
  const res = await api.fetchSearchVideoList({
    part: "snippet",
    maxResults: 24,
    q: keyword,
    pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
    regionCode: "KR",
    type: "video",
  });

  return res;
};

const VideoListView = () => {
  // navigate
  const navigate = useNavigate();

  // searchParams
  const searchParams = useSearchParams()[0];

  // useRef
  const targetRef = useRef<HTMLDivElement>(null);

  // useState
  const [videoList, setVideoList] = useState<InfiniteData<any> | null>(null);
  const [isExceeding, setIsExceeding] = useState<boolean>(false);

  const { fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery(
      "videoList",
      ({ pageParam = undefined }) => fetchPopularVideoList(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
        onSuccess: (data) => {
          console.log(data);
          setVideoList(data);
        },
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

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (!hasNextPage) {
      return;
    }

    if (entries[0].isIntersecting) {
      fetchNextPage();
    }
  };
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  if (!isLoading) return <FullPageLoadingView />;
  if (isExceeding) return <div>Exceeding Error</div>;
  if (!videoList.pages.length) return <>None Data</>;
  return (
    <>
      <Pub.Container>
        {videoList.pages.map((pageData) => {
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
