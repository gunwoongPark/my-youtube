import { apiBase, ApiBase } from ".";
import { VideoReq } from "./video/schema";

export class Api extends ApiBase {
  fetchPopularVideoList = ({ part, chart, maxResults }: VideoReq) =>
    apiBase.get(
      `/videos?part=${part}&chart=${chart}&maxResults=${maxResults}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
}

export const api = new Api();
