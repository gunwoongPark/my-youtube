import axios from "axios";
import { useCallback, useEffect } from "react";
import { api } from "../lib/api/api";

const ContentsView = () => {
  useEffect(() => {
    fetchVideoList();
  }, []);

  const fetchVideoList = useCallback(async () => {
    try {
      const res = await api.fetchPopularVideoList({
        part: "snippet",
        chart: "mostPopular",
        maxResults: 30,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <></>;
};

export default ContentsView;
