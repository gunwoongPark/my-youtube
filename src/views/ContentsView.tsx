import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useMediaQuery from "../hooks/useMediaQuery";
import { api } from "../lib/api/api";
import { DeviceType } from "../types/type";
import VideoItemView from "./VideoItemView";
import FullPageLoadingView from "../components/FullPageLoadingView";

const ContentsView = () => {
  const [isInitLoading, setIsInitLoading] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<any[]>([]);

  const deviceType = useMediaQuery();

  useEffect(() => {
    fetchVideoList();
  }, []);

  const fetchVideoList = useCallback(async () => {
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

      console.log(res);

      setVideoList(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitLoading(false);
    }
  }, [isInitLoading]);

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
