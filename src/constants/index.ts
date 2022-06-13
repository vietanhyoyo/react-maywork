const DOMAIN = process.env.REACT_APP_BASE_URL;

const Constants = {
    Api: {
        BASE_URL: `${DOMAIN}/api`,
        TIMEOUT: 25 * 1000,
    },

    /**
     * Return code from Api
     */
    ApiCode: {
        // Code from server api
        SUCCESS: 200,
        BAD_REQUEST: 400,
        INTERNAL_SERVER_ERROR: 500,

        // Code from local app
        CONNECTION_TIMEOUT: "CONNECTION_TIMEOUT",
        INTERNAL_SERVER: "INTERNAL_SERVER",
        UNKNOWN_NETWORK: "UNKNOWN_NETWORK",
    },

    ApiPath: {
        SIGNIN: "/auth/signin",
        UPDATE_ACCOUNT: "/user/update",
        UPDATE_PASSWORD: "/auth/changePass"
    },

    /**
     * Styles for app.
     *
     * Color refer
     * @see https://www.rapidtables.com/web/color/index.html
     * @see https://www.w3schools.com/w3css/w3css_colors.asp
     */
    Styles: {
        // =====================================================================
        // Common color
        // =====================================================================
        PRIMARY_COLOR: "#15CDD3",
        PRIMARY_DARK_COLOR: "rgb(13, 142, 147)",
        BLACK_COLOR: "#000000",
        BLUE_COLOR: "#3b82f6",
        LIGHT_BLUE_COLOR: "#12B7BC",
        GRAY_COLOR: "#808080",
        GREEN_COLOR: "#008000",
        LIGHT_GRAY_COLOR: "#f9fafb",
        RED_COLOR: "#FF0000",
        WHITE_COLOR: "#FFFFFF",

        // New - Analysis - Processing - Processed - Cancelled - Close
        STATUS_COLOR: ["#27AE60", "#FEC600", "#24EBC7", "#00AFF0", "#D3D3D3", "#CED4DA"],

        // =====================================================================
        // Console log style
        // Color refer at: https://www.w3schools.com/w3css/w3css_colors.asp
        // =====================================================================
        CONSOLE_LOG_DONE_ERROR: "border: 2px solid #F44336; color: #000000", // Red
        CONSOLE_LOG_DONE_SUCCESS: "border: 2px solid #4CAF50; color: #000000", // Green
        CONSOLE_LOG_ERROR: "background: #F44336; color: #FFFFFF", // Red
        CONSOLE_LOG_NOTICE: "background: #FF9800; color: #000000; font-size: x-large", // Orange
        CONSOLE_LOG_PREPARE: "border: 2px solid #2196F3; color: #000000", // Blue
        CONSOLE_LOG_START: "background: #2196F3; color: #FFFFFF", // Blue
        CONSOLE_LOG_SUCCESS: "background: #4CAF50; color: #FFFFFF", // Green

        // =====================================================================
        // Common size
        // =====================================================================
        AVATAR_SIZE: "80px",
        DEFAULT_FONTSIZE: "16px",
        DEFAULT_SPACING: "24px",

        // =====================================================================
        // Font size
        // =====================================================================
        FONT_SIZE_SMALL: 13,
        FONT_SIZE_DEFAULT: 15,
        FONT_SIZE_MEDIUM: 17,
        FONT_SIZE_LARGE: 23,
        FONT_SIZE_XLARGE: 27,
        FONT_SIZE_XXLARGE: 31,

        BOX_BORDER_RADIUS: 6,
        BOX_SHADOW: 3,
    },

    /**
     * Regex Expression
     */
     RegExp: {
        /** https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
        EMAIL_ADDRESS: new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@`
            + `((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`),
        NEW_EMAIL_ADDRESS: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        /** https://gist.github.com/HarishChaudhari/0dd5514ce430991a1b1b8fa04e8b72a4 */
        PASSWORD: new RegExp(`/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/`),
        // PHONE_NUMBER: new RegExp(`/^(09|01|08|03|07|05[0-9])+([0-9]{8,9})$/`),
        // PHONE_NUMBER: new RegExp(`/^0(1\d{9}|9\d{8})$/`),
        PHONE_NUMBER: new RegExp(/^(?:0)?([1|3|5|7|8|9]{1})?([0-9]{8})$/),
    },

    /**
     * Storage keys
     */
    StorageKeys: {
        ACCESS_TOKEN: "ACCESS_TOKEN",
        USER_INFO: "USER_INFO"
    },

    COCCOC_BRAND_NAME: "CocCoc"
};

export default Constants;