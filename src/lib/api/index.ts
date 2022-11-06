import axios, { AxiosRequestConfig } from "axios";
import { config } from "../config";

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUri,
});

export class ApiBase {
  get = async (url: string, config?: AxiosRequestConfig<any>) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}

export const apiBase = new ApiBase();
