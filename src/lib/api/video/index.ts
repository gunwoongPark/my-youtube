import { isString } from "lodash";
import apiBase from "..";
import { VideoReq } from "./schema";

const videoApi = {
  /**
   * 인기 리스트 출력
   * @param  {} {part
   * @param  {} chart
   * @param  {} maxResults
   * @param  {} pageToken
   * @param  {VideoReq} }
   * @returns Promise
   */
  fetchPopularVideoList: ({
    part,
    chart,
    maxResults,
    pageToken,
    regionCode,
  }: VideoReq): Promise<any> =>
    apiBase.get(
      `/videos?part=${part}&chart=${chart}&maxResults=${maxResults}&regionCode=${regionCode}&key=${
        process.env.REACT_APP_YOUTUBE_API_KEY
      }${isString(pageToken) ? `&pageToken=${pageToken}` : ""}`
    ),
};

export default videoApi;
