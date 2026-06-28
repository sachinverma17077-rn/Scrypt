import api from './api';
import { AxiosError, AxiosRequestConfig } from 'axios';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

class ApiService {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await api.get<ApiResponse<T>>(url, config);

      if (response.data?.message) {
        globalThis.ToastMessage?.(response.data.message, 'success');
      }

      return response.data as unknown as T;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await api.post<ApiResponse<T>>(url, body, config);

      if (response.data?.message) {
        globalThis.ToastMessage?.(response.data.message, 'success');
      }

      return response.data as unknown as T;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await api.put<ApiResponse<T>>(url, body, config);

      if (response.data?.message) {
        globalThis.ToastMessage?.(response.data.message, 'success');
      }

      return response.data as unknown as T;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await api.delete<ApiResponse<T>>(url, config);

      if (response.data?.message) {
        globalThis.ToastMessage?.(response.data.message, 'success');
      }

      return response.data as unknown as T;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  async patch<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await api.patch<ApiResponse<T>>(url, body, config);

    if (response.data?.message) {
      globalThis.ToastMessage?.(response.data.message, 'success');
    }

    return response.data as unknown as T;
  } catch (error) {
    this.handleError(error);
    throw error;
  }
}

  private handleError(error: unknown) {
    const err = error as AxiosError<{
      message?: string;
      error?: string;
    }>;

    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Something went wrong';

    globalThis.ToastMessage?.(message, 'error');
  }
}

export default new ApiService();