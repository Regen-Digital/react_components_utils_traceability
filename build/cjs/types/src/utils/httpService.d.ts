import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * Config Axios instance with default value and use it to make http request
 */
declare class BaseAPI {
    protected axiosInstance: AxiosInstance;
    constructor();
    /**
     * Set bearer token authorization headers for axios instance
     * @param token
     */
    setBearerTokenAuthorizationHeaders(token: string): void;
    /**
     * Set content type header for axios instance
     * @param contentType
     */
    setContentTypeHeader(contentType: string): void;
    /**
     * Handle response from axios instance with method like get, post, put
     * @param response
     * @returns response data
     */
    handleResponse(response: AxiosResponse): any;
    /**
     * Make get request with axios instance
     * @param url
     * @param config change default config of axios instance
     * @returns response data or error
     */
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<any>;
    /**
     * Make post request with axios instance
     * @param url
     * @param data body of request
     * @param config change default config of axios instance
     * @returns response data or error
     */
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
    /**
     * Make put request with axios instance
     * @param url
     * @param data body of request
     * @param config change default config of axios instance
     * @returns response data or error
     */
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
}
/**
 * Public API for making http request without authorization
 */
declare class PublicAPI extends BaseAPI {
    private static instance;
    constructor();
    static getInstance(): PublicAPI;
}
/**
 * Private API for making http request with authorization
 */
declare class PrivateAPI extends BaseAPI {
    private static instance;
    constructor();
    static getInstance(): PrivateAPI;
}
export declare const publicAPI: PublicAPI;
export declare const privateAPI: PrivateAPI;
export {};
