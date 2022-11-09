import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DeviceContext } from "../App";
import { api } from "../lib/api/api";
import VideoItemView from "../views/VideoItemView";

const ContentsView = () => {
  const deviceType = useContext(DeviceContext);

  useEffect(() => {
    console.log(deviceType);
  }, [deviceType]);

  const [isInitLoading, setIsInitLoading] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<any[]>([]);

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
        maxResults: 40,
      });

      setVideoList(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitLoading(false);
    }
  }, [isInitLoading]);

  return (
    <Pub.Container>
      {!!videoList.length ? (
        videoList.map((video, index) => (
          <VideoItemView
            key={`video-list-item-${index}-${video.id}`}
            video={video}
          />
        ))
      ) : (
        <div>NONE DATA</div>
      )}
    </Pub.Container>
  );
};

export default ContentsView;

const Pub = {
  Container: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `,
};
