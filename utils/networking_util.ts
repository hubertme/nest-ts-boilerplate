import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosResponseHeaders } from 'axios';

class ResponseObject<T> {
    public readonly headers: Record<string, string>;
    public readonly data: T;

    constructor(headers: Record<string, string>, data: T) {
        this.headers = Object.entries(headers).reduce((acc, [key, value]) => {
            acc[key] = value.toString();
            return acc;
        }, {} as Record<string, string>);
        this.data = data;
    }
}

export default class NetworkingUtil {
    private axiosInstance: AxiosInstance;
    private defaultHeaders: Record<string, string>;

    constructor(baseURL: string, defaultHeaders: Record<string, string>) {
        const options: AxiosRequestConfig = {
            baseURL,
            timeout: 60 * 1000, // Set timeout to 60s - in ms
        };
        this.axiosInstance = axios.create(options);
        this.defaultHeaders = defaultHeaders;
    }

    private convertHeaders(headers: any): Record<string, string> {
        return Object.entries(headers).reduce((acc, [key, value]) => {
            acc[key] = value.toString();
            return acc;
        }, {} as Record<string, string>);
    }

    private async request<T>(method: string, url: string, data?: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        try {
            headers = {
                ...this.defaultHeaders,
                'Content-Type': 'application/json',
                ...headers,
            };
            const options: AxiosRequestConfig = {
                url,
                method,
                headers,
                data,
            };
            const response: AxiosResponse<T> = await this.axiosInstance.request<T>(options);
            const responseHeaders = this.convertHeaders(response.headers);
    
            return new ResponseObject<T>(responseHeaders, response.data);
        } catch (e) {
            if (e.response) {
                const responseHeaders = this.convertHeaders(e.response.headers);
                const responseObject = new ResponseObject<T>(responseHeaders, e.response.data);
                
                return responseObject;
            } else {
                throw e;
            }
        }
    }

    async get<T>(url: string, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        return this.request<T>('GET', url, undefined, headers);
    }

    async post<T>(url: string, data: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        return this.request<T>('POST', url, data, headers);
    }

    async postForm<T>(url: string, formData: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers,
        };
        const serializedData = new URLSearchParams(formData);
        return this.request<T>('post', url, serializedData.toString(), headers);
    }

    async postFormFile<T>(url: string, file: File, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        const formData = new FormData();
        formData.append('file', file);
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'multipart/form-data',
            ...headers,
        };
        return this.request<T>('post', url, formData, headers);
    }

    async put<T>(url: string, data: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        return this.request<T>('PUT', url, data, headers);
    }

    async patch<T>(url: string, data: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        return this.request<T>('PATCH', url, data, headers);
    }

    async delete<T>(url: string, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        return this.request<T>('DELETE', url, undefined, headers);
    }
}