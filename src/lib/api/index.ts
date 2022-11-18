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
      if (axios.isAxiosError(error)) {
        const { response } = error;

        if (response?.status === 403) {
          console.log("in!");
        }
      }
    }
  };
}

export const apiBase = new ApiBase();
