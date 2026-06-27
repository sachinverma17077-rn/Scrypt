import api from "./api";
import { AxiosRequestConfig } from "axios";

class ApiService {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.post<T>(url, body, config);
    return response.data;
  }

  async put<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.put<T>(url, body, config);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await api.delete<T>(url, config);
    return response.data;
  }
}

export default new ApiService();