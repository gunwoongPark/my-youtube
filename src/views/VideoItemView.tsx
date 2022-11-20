import styled, { css } from "styled-components";
import dateFormat from "../util/date";

const VideoItemView = (props: { video: any }) => {
  console.log(props.video);

  return (
    <Pub.Container
      width={props.video.snippet.thumbnails.medium.width}
      height={props.video.snippet.thumbnails.medium.height}
    >
      <div className="video-container">
        <img
          src={props.video.snippet.thumbnails.medium.url}
          alt={`video-${props.video.id}`}
        />
      </div>
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
    .video-container {
      overflow: hidden;
      width: ${({ width }) =>
        css`
          ${width}px
        `};
      height: ${({ height }) =>
        css`
          ${height}px
        `};
      border-radius: 4px;
      border: 2px solid ${(props) => props.theme.borderColor};
      transition: border 0.2s ease-out;

      img {
        width: 100%;
        height: 100%;
        transition: transform 0.2s ease-out;
      }

      &:hover {
        cursor: pointer;
        border: 2px solid ${(props) => props.theme.hoverBorderColor};
      }

      &:hover img {
        transform: scale(1.1);
      }
    }
  `,
};
