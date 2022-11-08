import styled, { css } from "styled-components";
import dateFormat from "../ex/date";

const VideoItemView = (props: { video: any }) => {
  const { video } = props;

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
      <p>published at {dateFormat.d1(video.snippet.publishedAt)}</p>
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
