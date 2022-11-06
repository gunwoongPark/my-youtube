const VideoItemView = (props: { video: any }) => {
  return <img src={props.video.snippet.thumbnails.medium.url} />;
};

export default VideoItemView;
