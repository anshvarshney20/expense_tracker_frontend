
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { APIResponse } from './types';

const API_BASE_URL = '/api/v1';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to unwrap the data
apiClient.interceptors.response.use(
    (response: AxiosResponse<APIResponse<any>>) => {
        // If the response is successful and has our envelope
        if (response.data && typeof response.data.success === 'boolean') {
            if (!response.data.success) {
                // Handle custom error structure if needed
                return Promise.reject(response.data.message || 'Operation failed');
            }
            return response.data as any; // Return the whole envelope or just .data? 
            // Requirement says "Typed Axios wrapper. Must unwrap backend envelope correctly."
            // I'll return response.data.data but the types might be tricky with the wrapper.
            // Let's return the envelope data directly to the hook.
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized (redirect or clear session)
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }

        const data = error.response?.data;
        if (data?.error?.details && Array.isArray(data.error.details)) {
            const details = data.error.details.map((d: any) => {
                const field = d.loc[d.loc.length - 1];
                return `${field}: ${d.msg}`;
            }).join(', ');
            return Promise.reject(`Validation Error: ${details}`);
        }

        return Promise.reject(data?.message || error.message || 'Something went wrong');
    }
);

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<any, APIResponse<T>>(url, config).then(res => res.data),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.post<any, APIResponse<T>>(url, data, config).then(res => res.data),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.put<any, APIResponse<T>>(url, data, config).then(res => res.data),

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.patch<any, APIResponse<T>>(url, data, config).then(res => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<any, APIResponse<T>>(url, config).then(res => res.data),
};

export default apiClient;
