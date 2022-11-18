import styled, { css } from "styled-components";
import dateFormat from "../util/date";

const VideoItemView = (props: { video: any }) => {
  return (
    <Pub.Container
      width={props.video.snippet.thumbnails.medium.width}
      height={props.video.snippet.thumbnails.medium.height}
    >
      <img
        src={props.video.snippet.thumbnails.medium.url}
        alt={`video-${props.video.id}`}
      />
      <p>{props.video.snippet.title}</p>
      <p>published at {dateFormat.d1(props.video.snippet.publishedAt)}</p>
    </Pub.Container>
  );
};

export default VideoItemView;

interface VideoItemViewStylePropsType {
  width: number;
  height: number;
}

const Pub = {
  Container: styled.div<VideoItemViewStylePropsType>`
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
