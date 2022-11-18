import { PartType } from "../../../types/type";

export interface SearchReq {
  part: PartType;
  maxResults: number;
  q: string;
  pageToken?: string;
}
