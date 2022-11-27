import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { api } from "../lib/api/api";
import VideoItemView from "./VideoItemView";
import FullPageLoadingView from "../components/FullPageLoadingView";
import { isNil } from "lodash";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import SpinnerView from "../components/SpinnerView";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FetchType } from "../types/type";

const ContentsView = () => {
  // navigate
  const navigate = useNavigate();
  // searchParams
  const searchParams = useSearchParams()[0];

  // useRef
  const targetRef = useRef<HTMLDivElement>(null);
  const isInit = useRef(false);

  // useState
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [totalVideoNumber, setTotalVideoNumber] = useState<number | null>(null);
  const [isExceeding, setIsExceeding] = useState<boolean>(false);

  // useEffect
  // fetch video list
  useEffect(() => {
    isInit.current = false;
    setNextPageToken(null);

    if (isNil(searchParams.get("keyword"))) {
      fetchVideoList("VIDEO");
    } else {
      fetchVideoList("SEARCH");
    }
  }, [searchParams]);

  // infinite scroll setting
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (isFetchLoading) {
      return;
    }

    if (!isInit.current) {
      return;
    }

    if (videoList.length === totalVideoNumber) {
      return;
    }

    if (entries[0].isIntersecting) {
      if (isNil(searchParams.get("keyword"))) {
        fetchVideoList("VIDEO");
      } else {
        fetchVideoList("SEARCH");
      }
    }
  };
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  const fetchVideoList = async (type: FetchType) => {
    try {
      if (isFetchLoading) {
        return;
      }

      setIsFetchLoading(true);

      if (!isInit.current) {
        setVideoList([]);
      }

      let res: any;
      // fetch popular
      if (type === "VIDEO") {
        res = await api.fetchPopularVideoList({
          part: "snippet",
          chart: "mostPopular",
          maxResults: 24,
          pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
          regionCode: "KR",
        });
      }
      // fetch by keyword
      else {
        res = await api.fetchSearchVideoList({
          part: "snippet",
          maxResults: 24,
          q: searchParams.get("keyword") as string,
          pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
          regionCode: "KR",
          type: "video",
        });
      }

      setIsExceeding(false);

      // init fetch
      if (isNil(nextPageToken)) {
        setVideoList(res.items);
      }
      // infinite scroll fetch
      else {
        setVideoList((prevVideoList) => [...prevVideoList, ...res.items]);
      }

      setTotalVideoNumber(res.pageInfo.totalResults);
      setNextPageToken(res.nextPageToken);

      isInit.current = true;
    } catch (error) {
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
              search: "?code=UNKNOWN&message=Sorry, an unknown error occurred.",
            });
        }
      }
    } finally {
      setIsFetchLoading(false);
    }
  };

  // TSX
  return (
    <>
      <Pub.Container isNoneData={!videoList.length}>
        {(() => {
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
        })()}
      </Pub.Container>

      {/* target element */}
      <div ref={targetRef} />

      {/* components */}
      {isInit.current && isFetchLoading && <SpinnerView />}
    </>
  );
};

export default ContentsView;

interface ContentsViewStylePropsType {
  isNoneData: boolean;
}

const Pub = {
  Container: styled.div<ContentsViewStylePropsType>`
    margin-top: 36px;
    text-align: center;

    ${({ isNoneData }) => {
      if (isNoneData) {
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
