import { isString } from "lodash";
import { apiBase, ApiBase } from ".";
import { SearchReq } from "./search/schema";
import { VideoReq } from "./video/schema";

export class Api extends ApiBase {
  /**
   * 인기 리스트 출력
   * @param  {} {part
   * @param  {} chart
   * @param  {} maxResults
   * @param  {} pageToken
   * @param  {VideoReq} }
   * @returns Promise
   */
  fetchPopularVideoList = ({
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
    );

  /**
   * 검색 리스트 출력
   * @param  {} {part
   * @param  {} maxResults
   * @param  {} q
   * @param  {SearchReq} pageToken}
   */
  fetchSearchVideoList = ({
    part,
    maxResults,
    q,
    pageToken,
    regionCode,
  }: SearchReq) =>
    apiBase.get(
      `/search?part=${part}&maxResults=${maxResults}&q=${q}&regionCode=${regionCode}&key=${
        process.env.REACT_APP_YOUTUBE_API_KEY
      }${isString(pageToken) ? `&pageToken=${pageToken}` : ""}`
    );
}

export const api = new Api();
