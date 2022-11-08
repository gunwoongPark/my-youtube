import { useEffect } from "react";
import styled, { css } from "styled-components";

const VideoItemView = (props: { video: any }) => {
  const { video } = props;
  useEffect(() => {
    console.log(props.video);
  }, [props.video]);

  return (
    <Pub.Container
      width={video.snippet.thumbnails.medium.width}
      height={video.snippet.thumbnails.medium.height}
    >
      <img
        src={props.video.snippet.thumbnails.medium.url}
        alt={`video-${video.id}`}
      />
      <p>{video.snippet.title}</p>
    </Pub.Container>
  );
};

export default VideoItemView;

type VideoContainerType = {
  width: number;
  height: number;
};

const Pub = {
  Container: styled.div<VideoContainerType>`
    display: inline-block;
    width: ${({ width }) =>
      css`
        ${width}px
      `};
    height: ${({ height }) =>
        css`
          ${height}px
        `}
      & img {
      width: 100%;
      height: 100%;
    }
  `,
};
