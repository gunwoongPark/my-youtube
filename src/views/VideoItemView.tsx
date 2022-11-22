import styled, { css } from "styled-components";
import dateFormat from "../util/date";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchModel } from "../model/searchModel";

const VideoItemView = (props: { video: any }) => {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!!searchModel.keyword.length) {
      setVideoId(props.video.id.videoId);
    } else {
      setVideoId(props.video.id);
    }
  }, [props.video]);

  return (
    <Pub.Container
      width={props.video.snippet.thumbnails.medium.width}
      height={props.video.snippet.thumbnails.medium.height}
      isMobile={isMobile}
    >
      <Link to={`/detail?id=${videoId}`} className="video-container">
        <img
          className="video-thumbnail"
          src={props.video.snippet.thumbnails.medium.url}
          alt={`video-${videoId}`}
        />

        <div className="overlay">
          <i>
            <BsFillPlayCircleFill />
          </i>
        </div>
      </Link>
      <p>{props.video.snippet.title}</p>
      <p>published at {dateFormat.d1(props.video.snippet.publishedAt)}</p>
    </Pub.Container>
  );
};

export default VideoItemView;

interface VideoItemViewStylePropsType {
  width: number;
  height: number;
  isMobile: boolean;
}

const Pub = {
  Container: styled.div<VideoItemViewStylePropsType>`
    max-width: ${({ width }) =>
      css`
        ${width}px
      `};

    .video-container {
      overflow: hidden;
      display: flex;
      position: relative;

      width: ${({ width }) =>
        css`
          ${width}px
        `};
      height: ${({ height }) =>
        css`
          ${height}px
        `};
      border-radius: 6px;
      border: 2px solid ${(props) => props.theme.borderColor};
      transition: border 0.2s ease-out;

      ${({ isMobile }) => {
        if (!isMobile) {
          return css`
            &:hover {
              cursor: pointer;
              border: 2px solid ${(props) => props.theme.hoverBorderColor};
            }

            &:hover img {
              transform: scale(1.1);
            }
          `;
        }
      }}

      img.video-thumbnail {
        width: 100%;
        height: 100%;
        transition: transform 0.2s ease-out;
      }

      div.overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        opacity: 0;
        transition: opacity 0.2s ease-out;

        i {
          font-size: 48px;
          transform: scale(0);
          transition: transform 0.2s ease-out;
          color: ${(props) => props.theme.color};
        }

        ${({ isMobile }) => {
          if (!isMobile) {
            return css`
              &:hover {
                opacity: 1;
              }

              &:hover i {
                transform: scale(1);
              }
            `;
          }
        }}
      }
    }
  `,
};
