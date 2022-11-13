import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";
import { api } from "../lib/api/api";
import { DeviceType } from "../types/type";
import VideoItemView from "./VideoItemView";
import FullPageLoadingView from "../components/FullPageLoadingView";
import useMount from "../hooks/useMount";
import { isNil } from "lodash";

const ContentsView = () => {
  const isFetch = useRef(false);

  const [isInitLoading, setIsInitLoading] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [fetchVideoNumber, setFetchVideoNumber] = useState<number | null>(null);

  const deviceType = useMediaQuery();

  useMount(() => {
    switch (deviceType) {
      case "PC":
        setFetchVideoNumber(16);
        break;
      case "TABLET":
        setFetchVideoNumber(9);
        break;
      case "MOBILE":
        setFetchVideoNumber(6);
        break;
      default:
        return;
    }
  }, [deviceType]);

  useEffect(() => {
    if (isNil(fetchVideoNumber)) {
      return;
    }

    fetchVideoList();
  }, [fetchVideoNumber]);

  const fetchVideoList = useCallback(async () => {
    try {
      if (isInitLoading) {
        return;
      }

      setIsInitLoading(true);

      const res = await api.fetchPopularVideoList({
        part: "snippet",
        chart: "mostPopular",
        maxResults: fetchVideoNumber as number,
      });

      setVideoList(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitLoading(false);
    }
  }, [isInitLoading, fetchVideoNumber]);

  return (
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
