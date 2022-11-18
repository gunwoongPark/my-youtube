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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContentsView = observer(() => {
  // navigate
  const navigate = useNavigate();

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
  // init video list
  useEffect(() => {
    fetchPopularVideoList();
  }, []);

  useEffect(() => {
    if (!!searchModel.keyword.length) {
      isInit.current = false;
      setNextPageToken(null);

      fetchSearchVideoList();
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
        if (!!searchModel.keyword.length) {
          fetchSearchVideoList();
        } else {
          fetchPopularVideoList();
        }
      }
    },
    [isFetchLoading, totalVideoNumber, videoList.length, searchModel.keyword]
  );
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  // function
  const fetchPopularVideoList = useCallback(async () => {
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

      if (axios.isAxiosError(res)) {
        if (res.response?.status === 404 || res.response?.status === 500) {
          navigate("/error");
        } else if (res.response?.status === 403) {
          setIsExceeding(true);
          return;
        }
      }

      setIsExceeding(false);

      if (isNil(nextPageToken)) {
        // init fetch
        setVideoList(res.items);
      }
      // infinite scroll fetch
      else {
        setVideoList((prevVideoList) => [...prevVideoList, ...res.items]);
      }

      setTotalVideoNumber(res.pageInfo.totalResults);
      setNextPageToken(res.nextPageToken);

      isInit.current = true;
    } finally {
      setIsFetchLoading(false);
    }
  }, [isFetchLoading, nextPageToken, navigate]);

  const fetchSearchVideoList = useCallback(async () => {
    try {
      if (isFetchLoading) {
        return;
      }

      setIsFetchLoading(true);

      if (!isInit.current) {
        setVideoList([]);
      }

      const res = await api.fetchSearchVideoList({
        part: "snippet",
        maxResults: 24,
        q: searchModel.keyword,
        pageToken: isNil(nextPageToken) ? undefined : nextPageToken,
      });

      if (axios.isAxiosError(res)) {
        if (res.response?.status === 404 || res.response?.status === 500) {
          navigate("/error");
        } else if (res.response?.status === 403) {
          setIsExceeding(true);
          return;
        }
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
    } finally {
      setIsFetchLoading(false);
    }
  }, [isFetchLoading, nextPageToken, navigate]);

  // TSX
  return (
    <>
      <Pub.Container>
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
            return <div>NONE VIDEO</div>;
          }
        })()}
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
