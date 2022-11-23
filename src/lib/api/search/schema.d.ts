import { PartType, SearchType } from "../../../types/type";

export interface SearchReq {
  part: PartType;
  maxResults: number;
  q: string;
  regionCode: string;
  pageToken?: string;
  type: SearchType;
}
