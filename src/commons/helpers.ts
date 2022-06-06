import moment from "moment";
import Swal from "sweetalert2"
import Constants from "@app/constants";

/**
 * Helpers.ts
 *
 * Common function for app.
 */
const Helpers = {

    /**
     * Check value is string or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is string true. Otherwise it returns false.
     */
    isString: (value: any): value is string => {
        return typeof value === "string";
    },

    /**
     * Check value is object or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is object true. Otherwise it returns false.
     */
    isObject: (value: any): value is object => {
        return typeof value === "object";
    },

    /**
     * Determine if the argument passed is a JavaScript function object.
     *
     * @param {any} obj: Object to test whether or not it is an array.
     * @returns {boolean} returns a Boolean indicating whether the object is a JavaScript function
     */
    isFunction: (value: any): value is (...args: any) => void => {
        return typeof value === "function";
    },

    /**
     * Check a value is number or non, if number then return true, otherwise return false.
     *
     * @param {string} value: Value can check number
     * @returns {boolean} if number then return true, otherwise return false.
     */
    isNumber: (value: any): value is number => {
        return typeof value === "number";
    },

    /**
     * Check Object is null or String null or empty.
     *
     * @param {object | string} value Object or String
     * @returns {boolean} if null or empty return true, otherwise return false.
     */
    isNullOrEmpty: (value: any): value is undefined | boolean => {
        return value === undefined || value === null || value === "";
    },

    /**
     * Trim space character (start, end) of input string.
     *
     * @param {string} value: Value for trim
     * @returns {string} String after trim, space start & end is removed
     */
    trim: (value: string): string => {
        return Helpers.isString(value) ? value.trim() : "";
    },

    /**
     * If value is string return value, otherwise return value.toString
     *
     * @param {string} value: Value
     * @returns {string} String or convert of value to string
     */
    ensureString: (value: any): string => {
        try {
            if (!Helpers.isNullOrEmpty(value)) {
                if (Helpers.isString(value)) {
                    return value;
                } else if (Helpers.isObject(value)) {
                    return JSON.stringify(value);
                } else {
                    return `${value}`;
                }
            }
        } catch (error) {
            return "";
        }
        return "";
    },

    /**
     * Convert size in bytes to KB, MB, GB or TB
     *
     * @param {number} bytes: Size convert
     * @returns {string} Value formatted include unit.
     */
    bytesToSize: (bytes: number): string => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (Helpers.isNullOrEmpty(bytes) || (bytes === 0)) {
            return "0 Byte";
        }
        const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)));
        return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
    },

    /**
     * Convert date to string with custom format.
     *
     * @param {number | Date} date Date or Timestamp
     * @param {string} format Format string output
     */
    dateToString: (date: number | Date | undefined, format: string): string => {
        if (Helpers.isNullOrEmpty(date)) {
            return "";
        } else if (Helpers.isNumber(date) && (`${date}`.length === 10)) {
            return moment.unix(date).format(format);
        } else {
            return moment(date).format(format);
        }
    },

    /**
     * Convert string to date.
     *
     * @param {string} dateString string
     */
    stringToDate: (dateString: string): Date => {
        return new Date(dateString);
    },

    /**
     * Convert date to unix time.
     *
     * @param {Date} date Date
     */
    dateToUnixTime: (date?: Date): number => {
        if (!Helpers.isNullOrEmpty(date)) {
            return moment(date).unix();
        }
        return 0;
    },

    fromNow: (date: number | Date): string => {
        return moment(date).fromNow();
    },

    /**
     * Get protocal from url.
     * e.g. URL is https://google.com, protocal output is [https:]
     *
     * @param {string} url URL
     * @returns {string} Protocal of URL, if not a URL return empty string
     */
    getProtocolFromURL: (url: string): string => {
        const urlTrim = Helpers.trim(url);
        const index = urlTrim.indexOf("//");
        if (index > -1) {
            return urlTrim.substring(0, index);
        }
        return "";
    },

    /**
     * Format numbers with leading zeros
     *
     * @param {number} num A number
     * @param {number} size Sring output length
     * @returns {string} String format with leading zero
     */
    zeroPad: (num: number, size: number): string => {
        let result = `${num}`;
        while (result.length < size) {
            result = "0" + result;
        }
        return result;
    },

    /**
     * Copy object properties to another object
     *
     * @param {any} sourceObj Object
     * @param {any} distObj Object
     */
    copyProperties: (sourceObj: any, distObj: any) => {
        for (const key in sourceObj) {
            if (!sourceObj.hasOwnProperty(key)) {
                continue;
            }
            const sourceObjData: any = sourceObj[key];
            if (!Helpers.isNullOrEmpty(sourceObjData)) {
                if (Array.isArray(sourceObjData)) {
                    const distObjData: any = [];
                    Helpers.copyProperties(sourceObjData, distObjData);
                    distObj[key] = distObjData;
                    continue;
                }
                if (Helpers.isObject(sourceObjData)) {
                    const distObjData: any = {};
                    Helpers.copyProperties(sourceObjData, distObjData);
                    distObj[key] = distObjData;
                    continue;
                }
            }
            distObj[key] = sourceObjData;
        }
    },

    /**
     * Clone object
     *
     * @param {T} sourceObj Object
     */
    cloneObject: <T>(sourceObj: T): T => {
        const cloneObj: T = {} as T;
        Helpers.copyProperties(sourceObj, cloneObj);
        return cloneObj;
    },

    /**
     * Get last date of month
     *
     * @param {number} month A number
     * @param {number} year A number
     */
    getLastDateOfMonth: (month: number, year: number): number => {
        const startOfMonth = moment([year, month - 1]);
        const lastOfMonth = moment(startOfMonth).endOf("month");
        return lastOfMonth.toDate().getDate();
    },

    /**
     * Show alert
     *
     * @param {string} message message for display
     * @param {"warning" | "success" | "error" | "info" | undefined} type type of alert
     */
    showAlert: async (message: string, type?: "warning" | "success" | "error" | "info" | "question", okCallback?: any) => {
        const msg = message
        const okPress = await Swal.fire({
            text: msg,
            icon: type,
            confirmButtonColor: "#13CBD2"
        })
        if (okPress && okPress.isConfirmed && okCallback && Helpers.isFunction(okCallback)) {
            okCallback()
        }
    },

    /**
     * Show confirm alert
     *
     * @param {string} message message for display
     * @param {function} okCallback callback handle when click ok
     * @param {function} cancelCallback callback handle when click cancel
     */
    showConfirmAlert: async (message: string, okCallback: any, cancelCallback?: any) => {
        const msg = message;
        const okPress = await Swal.fire({
            text: msg,
            icon: "warning",
            confirmButtonColor: "#13CBD2",
            showCancelButton: true,
            reverseButtons: true
        })
        if (okPress && okPress.isConfirmed && okCallback && Helpers.isFunction(okCallback)) {
            okCallback()
        } else {
            if (cancelCallback && Helpers.isFunction(cancelCallback)) {
                cancelCallback()
            }
        }
    },

    getBase64: (file: Blob, callback: (result: any) => void) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            if (Helpers.isString(reader.result)) {
                const base64Data = reader.result.split(",");
                result = base64Data.length > 0 ? base64Data[1] : "";
            }
            console.log("getBase64", result)
            callback(result);
        }
        reader.onerror = (error) => {
            console.log("Error: ", error);
        }
    },

    getCharacterAvatar: (fullName?: string): string => {
        if (!fullName) {
            return "";
        }
        const itemNames = fullName.split(" ").filter((value: string) => {
            return value.trim().length > 0;
        });
        let fName = "";
        if (itemNames.length >= 2) {
            for (let i = itemNames.length - 2; i < itemNames.length; i++) {
                if (itemNames[i].length > 0) {
                    fName = fName + itemNames[i].substring(0, 1).toUpperCase();
                }
            }
        } else {
            fName = itemNames[0].substring(0, 1).toUpperCase()
        }
        return fName;
    },

    getFileExtesion: (fullFileName?: string) => {
        if (!Helpers.isNullOrEmpty(fullFileName)) {
            const length = fullFileName.length;
            const extension = fullFileName.slice(fullFileName.lastIndexOf(".") + 1, length);
            return extension.toLowerCase();
        } else {
            return "";
        }
    },

    readFileAsArrayBuffer: (file: File) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onerror = (event) => {
                reject(event);
            }

            reader.onload = function (event) {
                const arrayBuffer = new Uint8Array(reader.result as any);
                resolve(arrayBuffer);
            }

            reader.readAsArrayBuffer(file);
        });
    },

    isCocCoc: () => {
        const thisWindow: any = window;
        const brands: any[] = thisWindow?.navigator?.userAgentData?.brands || [];
        const indexOfCocCoc = brands?.findIndex(item => item.brand === Constants.COCCOC_BRAND_NAME);
        return indexOfCocCoc !== -1;
    },

    formatDate: (value?: string | Date | number, format?: string): string => {
        const result = value ? moment(value).local().format(format || "DD/MM/YYYY") : "";
        return result;
    },
};

export default Helpers;