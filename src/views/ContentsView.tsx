import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";
import { api } from "../lib/api/api";
import { DeviceType } from "../types/type";
import VideoItemView from "./VideoItemView";
import FullPageLoadingView from "../components/FullPageLoadingView";
import { isNil } from "lodash";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import SpinnerView from "../components/SpinnerView";

const ContentsView = () => {
  // useRef
  const targetRef = useRef<HTMLDivElement>(null);

  // deviceType
  const deviceType = useMediaQuery();

  // useState
  const [isInitLoading, setIsInitLoading] = useState<boolean>(false);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [totalVideoNumber, setTotalVideoNumber] = useState<number | null>(null);

  // useEffect
  useEffect(() => {
    initVideoList();
  }, []);

  // infinite scroll setting
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isInitLoading || isFetchLoading) {
        return;
      }

      if (videoList.length === totalVideoNumber) {
        return;
      }

      if (entries[0].isIntersecting) {
        fetchVideoList();
      }
    },
    [isInitLoading, isFetchLoading]
  );
  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  // function
  // init fetching
  const initVideoList = useCallback(async () => {
    try {
      if (isInitLoading) {
        return;
      }

      setIsInitLoading(true);

      const res = await api.fetchPopularVideoList({
        part: "snippet",
        chart: "mostPopular",
        maxResults: 24,
      });

      setTotalVideoNumber(res.pageInfo.totalResults);
      setNextPageToken(res.nextPageToken);
      setVideoList(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitLoading(false);
    }
  }, [isInitLoading]);

  // infinite scroll fetching
  const fetchVideoList = useCallback(async () => {
    try {
      if (isNil(nextPageToken)) {
        return;
      }

      if (isFetchLoading) {
        return;
      }

      setIsFetchLoading(true);

      const res = await api.fetchPopularVideoList({
        part: "snippet",
        chart: "mostPopular",
        maxResults: 24,
        pageToken: nextPageToken,
      });

      console.log(res);

      setNextPageToken(res.nextPageToken);
      setVideoList((prevVideoList) => [...prevVideoList, ...res.items]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchLoading(false);
    }
  }, [isFetchLoading, nextPageToken]);

  // TSX
  return (
    <>
      <Pub.Container deviceType={deviceType as DeviceType}>
        {isInitLoading ? (
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
      {isFetchLoading && <SpinnerView />}
    </>
  );
};

export default ContentsView;

interface ContentsViewStylePropsType {
  deviceType: DeviceType;
}

const Pub = {
  Container: styled.div<ContentsViewStylePropsType>`
    display: flex;
    flex-wrap: wrap;

    justify-content: ${(props) => {
      if (props.deviceType === "PC") {
        return "space-between";
      } else if (props.deviceType === "TABLET") {
        return "space-around";
      } else {
        return "center";
      }
    }};
  `,
};
