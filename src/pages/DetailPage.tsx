import { useSearchParams } from "react-router-dom";

const DetailPage = () => {
  const searchParams = useSearchParams()[0];

  return (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${searchParams.get("id")}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default DetailPage;
