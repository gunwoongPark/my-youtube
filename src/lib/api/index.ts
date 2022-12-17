import axios, { AxiosRequestConfig } from "axios";
import { config } from "../config";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUri,
});

const apiBase = {
  get: async (url: string, config?: AxiosRequestConfig<any>) => {
    const res = await axiosInstance.get(url, config);
    return res.data;
  },
};

export default apiBase;
