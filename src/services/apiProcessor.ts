import axios from "axios"
import Constants from "src/constants"
import Helpers from "src/commons/helpers"
import { IError, IResult } from "src/commons/interfaces"
const __DEV__ = process.env.NODE_ENV !== "production";

/**
 * Interface for configuration for Axios library
 */
export interface IConfiguration {
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    baseURL?: string,

    // `url` is the server URL that will be used for the request
    url?: string,

    // `method` is the request method to be used when making the request
    method?: Method,

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout?: number, // default is `0` (no timeout)
    // `headers` are custom headers to be sent
    headers?: any,

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params?: any,

    // `data` is the data to be sent as the request body
    // Only applicable for request methods "PUT", "POST", and "PATCH"
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
    data?: any
}

/**
 * Interface for response schema of Axios library
 */
export interface IResponse {
    // `data` is the response that was provided by the server
    data?: any,

    // `status` is the HTTP status code from the server response
    status?: number,

    // `statusText` is the HTTP status message from the server response
    statusText?: string,

    // `headers` the headers that the server responded with
    // All header names are lower cased
    headers?: any,

    // `config` is the config that was provided to `axios` for the request
    config?: any,

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request?: any
}

/**
 * Interface of Request
 */
export interface IRequest {
    requestId?: number,
    clientStartTime?: number,
    clientEndTime?: number,
    path: string,
    method?: Method,
    query?: any,
    data?: any,
    secure?: boolean,
    timeout?: number,
    headers?: any,
    contentType?: ContentType,
    onSuccess?: (result: IResult) => void,
    onError?: (error: IError) => void
}

/**
 * Enum for method
 */
export enum Method {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
}

/**
 * Enum for content type
 */
export enum ContentType {
    JSON = "application/json",
    FORM = "application/x-www-form-urlencoded",
    FORM_DATA = "multipart/form-data",
}

/**
 * APIAccessor.ts
 *
 * @see https://github.com/axios/axios
 * Promise based HTTP client for the react native.
 */
class APIProcessor {
    public static instance = new APIProcessor();
    private config: IConfiguration;
    private httpClient: any;

    constructor() {
        // Create configuration for axios library
        this.config = {
            baseURL: Constants.Api.BASE_URL,
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": ContentType.JSON,
            },
            method: Method.GET,
            timeout: Constants.Api.TIMEOUT,
        };

        // Create an instance using the config defaults provided by the library
        this.httpClient = axios.create(this.config);
    }

    /**
     * Update config to common config of http client.
     *
     * @param {IConfiguration} config New config
     * @param {boolean} forceUpdate Merge new config to common config if false, override if otherwise, default is false.
     */
    public static updateCommonConfig = (config: IConfiguration, forceUpdate: boolean = false) => {
        if (forceUpdate === true) {
            APIProcessor.instance.config = config;
        } else {
            APIProcessor.instance.config = {
                ...APIProcessor.instance.config,
                ...config
            };
        }
    }

    /**
     * Call api with POST method, using to upload file to server.
     *
     * @param {IRequest} request Request
     */
    public static postFormData = (request: IRequest): Promise<IResult> => {
        request.method = Method.POST;
        request.contentType = ContentType.FORM_DATA;
        const formData = new FormData();
        if (!Helpers.isNullOrEmpty(request.data)) {
            for (const key in request.data) {
                if (Helpers.isNullOrEmpty(request.data[key])) {
                    continue;
                }
                formData.append(key, request.data[key]);
            }
        }
        request.data = formData;
        return new Promise((resolve, reject) => {
            request.onSuccess = (result: IResult) => {
                resolve(result);
            };
            request.onError = (error: IError) => {
                reject(error);
            };
            APIProcessor.instance.fetch(request);
        });
    }

    /**
     * Call api with PATCH method.
     *
     * @param {IRequest} request Request
     */
    public static patch = (request: IRequest): Promise<IResult> => {
        request.method = Method.PATCH;
        return new Promise((resolve, reject) => {
            request.onSuccess = (result: IResult) => {
                resolve(result);
            };
            request.onError = (error: IError) => {
                reject(error);
            };
            APIProcessor.instance.fetch(request);
        });
    }

    /**
     * Call api with POST method.
     *
     * @param {IRequest} request Request
     */
    public static post = (request: IRequest): Promise<IResult> => {
        request.method = Method.POST;
        return new Promise((resolve, reject) => {
            request.onSuccess = (result: IResult) => {
                resolve(result);
            };
            request.onError = (error: IError) => {
                reject(error);
            };
            APIProcessor.instance.fetch(request);
        });
    }

    /**
     * Call api with GET method.
     *
     * @param {IRequest} request Request
     */
    public static get = (request: IRequest): Promise<IResult> => {
        request.method = Method.GET;
        return new Promise((resolve, reject) => {
            request.onSuccess = (result: IResult) => {
                resolve(result);
            };
            request.onError = (error: IError) => {
                reject(error);
            };
            APIProcessor.instance.fetch(request);
        });
    }

    /**
     * Call api with PUT method.
     *
     * @param {IRequest} request Request
     */
    public static put = (request: IRequest): Promise<IResult> => {
        request.method = Method.PUT;
        return new Promise((resolve, reject) => {
            request.onSuccess = (result: IResult) => {
                resolve(result);
            };
            request.onError = (error: IError) => {
                reject(error);
            };
            APIProcessor.instance.fetch(request);
        });
    }

    /**
     * Call api with DELETE method.
     *
     * @param {IRequest} request Request
     */
    public static delete = (request: IRequest): Promise<IResult> => {
        request.method = Method.DELETE;
        return new Promise((resolve, reject) => {
            request.onSuccess = (result: IResult) => {
                resolve(result);
            };
            request.onError = (error: IError) => {
                reject(error);
            };
            APIProcessor.instance.fetch(request);
        });
    }

    /**
     * Main function fetching data from server.
     *
     * @param {IRequest} request Request.
     */
    public fetch = async (request: IRequest) => {
        this.onBeforeCallback(request);

        // create config for each request
        const axiosConfig = await this.createAxiosConfig(request);
        if (__DEV__) {
            const { method, path, requestId } = request;
            console.log(`%c ${requestId} - #fetch [${method}: ${path}] `, Constants.Styles.CONSOLE_LOG_START);
            console.log("  > config :", axiosConfig);
        }

        // request to server
        this.httpClient.request(axiosConfig).then((response: Response) => {
            this.onAfterCallback(request, response);
            this.onSuccessCallback(request, response);
        }).catch((error: any) => {
            const response = error ? error.response : null;
            this.onAfterCallback(request, response, error);
            this.onErrorCallback(request, response, error);
        });
    }

    /**
     * Create config for each request.
     *
     * @param {IRequest} request Request.
     */
    private createAxiosConfig = async (request: IRequest): Promise<any> => {
        const axiosConfig = {
            ...this.config,
            method: request.method,
            url: request.path,
        };
        // timeout
        if (Helpers.isNumber(request.timeout)) {
            axiosConfig.timeout = request.timeout;
        }
        // query string
        // TODO: temporarily set locale to vn
        // axiosConfig.params = { ...axiosConfig.params, locale: "vn" };
        if (!Helpers.isNullOrEmpty(request.query)) {
            axiosConfig.params = { ...axiosConfig.params, ...request.query };
        }
        // data (IMPORTANT: not set data if method is GET)
        if (axiosConfig.method !== Method.GET) {
            axiosConfig.data = { ...axiosConfig.data, ...request.data };
            // authentication
            if (request.secure !== false) {
                // Add logic for authentication
                // add new secure to header or data or query string
            }
        }
        // headers
        if (!Helpers.isNullOrEmpty(request.contentType)) {
            axiosConfig.headers = {
                ...axiosConfig.headers,
                ["Content-Type"]: request.contentType
            };
        }

        const accessToken = sessionStorage.getItem(Constants.StorageKeys.ACCESS_TOKEN);
        if (accessToken) {
            axiosConfig.headers = {
                ...axiosConfig.headers,
                ["Authorization"]: accessToken
            };
        }

        if (!Helpers.isNullOrEmpty(request.headers)) {
            axiosConfig.headers = { ...axiosConfig.headers, ...request.headers };
        }
        return axiosConfig;
    }

    /**
     * Function execute before request to server.
     * Create request id and clientStartTime, using for monitoring and calculate request duration.
     *
     * @param {IRequest} request Request.
     */
    private onBeforeCallback = (request: IRequest) => {
        request.clientStartTime = Date.now();
        request.requestId = request.clientStartTime;
    }

    /**
     * Function execute after received from server.
     *
     * @param {IRequest} request Request.
     * @param {IResponse} response Response
     * @param {any} error Error if has error, default is null
     */
    private onAfterCallback = (request: IRequest, response: IResponse, error: any = null) => {
        request.clientEndTime = Date.now();
    }

    /**
     * Execute after end request if success
     *
     * @param {IRequest} request Request.
     * @param {IResponse} response Response
     */
    private onSuccessCallback = (request: IRequest, response: IResponse) => {
        const data = response.data;

        if (Helpers.isFunction(request.onSuccess)) {
            request.onSuccess({ data, response });
        }

        // TODO: check business status
        /* if (data.code === Constants.ApiCode.SUCCESS) {
            if (Helpers.isFunction(request.onSuccess)) {
                request.onSuccess({ data, response });
            }
        } else {
            const messages: any = Strings.Message;
            const message = messages[data.code] || data.message || messages.NOT_DEFINE;
            const error = {
                code: data.code,
                message
            };
            if (!Helpers.isNullOrEmpty(data.code) && (data.code.indexOf("99") === 0)) {
                DeviceEventEmitter.emit(Constants.EventName.COMMON_ERROR, error);
            }
            if (Helpers.isFunction(request.onError)) {
                request.onError(error);
            }
        } */


    }

    /**
     * Execute after end request if error
     *
     * @param {IRequest} request Request.
     * @param {IResponse} response Response
     * @param {any} error Error
     */
    private onErrorCallback = async (request: IRequest, response: IResponse, error: any) => {
        if (__DEV__) {
            const { method, path, requestId } = request;
            console.log(`%c ${requestId} - #onErrorCallback [${method}: ${path}] `, Constants.Styles.CONSOLE_LOG_ERROR);
            console.log("  > request  :", request);
            console.log("  > response :", response);
            console.log("  > error    :", error);
        }

        // Error handler
        if (error) {
            // TODO: show token expired
            if (response) {
                // Log error to debug console
                if (response.data && response.data.error_description) {
                    if (__DEV__) {
                        console.warn(`#onErrorCallback: ${response.data.error_description}`);
                    }
                }

                // Error server
                if (!Helpers.isNullOrEmpty(response.status)) {
                    if (__DEV__) {
                        console.warn("#onErrorCallback: Error server");
                    }
                    if (Helpers.isFunction(request.onError)) {
                        const message: string = response.data?.message;
                        request.onError({
                            code: response.status || Constants.ApiCode.INTERNAL_SERVER,
                            message: message
                        } as IError);
                    }
                    return;
                }
            }
        }
    }
}

export default APIProcessor;