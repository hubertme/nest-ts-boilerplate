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
            timeout: 60000, // Set timeout to 60s
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

    async get<T>(url: string, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json',
            ...headers,
        };
        const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }

    async post<T>(url: string, data: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json',
            ...headers,
        };
        const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }
    async postForm<T>(url: string, formData: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers,
        };
        const serializedData = Object.keys(formData)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
            .join('&');
        const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, serializedData, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }
    async postFormFile<T>(url: string, file: File, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        const formData = new FormData();
        formData.append('file', file);
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'multipart/form-data',
            ...headers,
        };
        const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, formData, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }

    async put<T>(url: string, data: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json',
            ...headers,
        };
        const response: AxiosResponse<T> = await this.axiosInstance.put<T>(url, data, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }

    async delete<T>(url: string, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json',
            ...headers,
        };
        const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }
    
    async patch<T>(url: string, data: any, headers: Record<string, string> = {}): Promise<ResponseObject<T>> {
        headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json',
            ...headers,
        };
        const response: AxiosResponse<T> = await this.axiosInstance.patch<T>(url, data, {
            headers,
        });
        const responseHeaders = this.convertHeaders(response.headers);

        return new ResponseObject<T>(responseHeaders, response.data);
    }
}
