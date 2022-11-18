import { ChartType, PartType } from "../../../types/type";

export interface VideoReq {
  part: PartType;
  chart: ChartType;
  maxResults: number;
  pageToken?: string;
}
