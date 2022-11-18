import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api } from "../lib/api/api";
import VideoItemView from "./VideoItemView";
import FullPageLoadingView from "../components/FullPageLoadingView";
import { isNil } from "lodash";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import SpinnerView from "../components/SpinnerView";
import { searchModel } from "../model/searchModel";
import { observer } from "mobx-react-lite";

const ContentsView = observer(() => {
  // useRef
  const targetRef = useRef<HTMLDivElement>(null);
  const isInit = useRef(false);

  // useState
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [totalVideoNumber, setTotalVideoNumber] = useState<number | null>(null);

  // useEffect
  // init video list
  useEffect(() => {
    fetchVideoList();
  }, []);

  useEffect(() => {
    if (!!searchModel.keyword.length) {
      isInit.current = false;
      setVideoList([]);
    }
  }, [searchModel.keyword]);

  // infinite scroll setting
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
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
        fetchVideoList();
      }
    },
    [isFetchLoading, totalVideoNumber, videoList.length]
  );
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  // function
  const fetchVideoList = useCallback(
    async (keyword?: string) => {
      try {
        if (isFetchLoading) {
          return;
        }

        setIsFetchLoading(true);

        const res = await api.fetchPopularVideoList({
          part: "snippet",
          chart: "mostPopular",
          maxResults: 24,
          pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
        });

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
        console.error(error);
      } finally {
        setIsFetchLoading(false);
      }
    },
    [isFetchLoading, nextPageToken]
  );

  // TSX
  return (
    <>
      <Pub.Container>
        {!isInit.current && isFetchLoading ? (
          <FullPageLoadingView />
        ) : !!videoList.length ? (
          videoList.map((video, index) => (
            <VideoItemView
              key={`video-list-item-${index}-${video.id}`}
              video={video}
            />
          ))
        ) : (
          <div>NONE VIDEO</div>
        )}
      </Pub.Container>

      {/* target element */}
      <div ref={targetRef} />
      {isInit.current && isFetchLoading && <SpinnerView />}
    </>
  );
});

export default ContentsView;

const Pub = {
  Container: styled.div`
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
