import { isString } from "lodash";
import apiBase from "..";
import { SearchReq } from "./schema";

const searchApi = {
  /**
   * 검색 리스트 출력
   * @param  {} {part
   * @param  {} maxResults
   * @param  {} q
   * @param  {SearchReq} pageToken}
   */
  fetchSearchVideoList: ({
    part,
    maxResults,
    q,
    pageToken,
    regionCode,
    type,
  }: SearchReq): Promise<any> =>
    apiBase.get(
      `/search?part=${part}&maxResults=${maxResults}&q=${q}&regionCode=${regionCode}&type=${type}&key=${
        process.env.REACT_APP_YOUTUBE_API_KEY
      }${isString(pageToken) ? `&pageToken=${pageToken}` : ""}`
    ),
};

export default searchApi;
