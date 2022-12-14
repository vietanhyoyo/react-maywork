import { useState } from "react"
import { Grid, Button, CircularProgress } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { IUserInfo } from "src/commons/interfaces"
import { storeUserInfo } from "src/store/slice/userInfo.slice"
import APIProcessor from "src/services/apiProcessor"
import Constants from "src/constants"
import Helpers from "src/commons/helpers"
import Resources from "src/commons/resources"
import Screens from "src/constants/screens"
import TextInput from "src/components/TextInput"
import Strings from "src/constants/strings"

interface SignInData {
    account?: string;
    password?: string;
    errorAccount?: string;
    errorPassword?: string;
}

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [signInData, setSignInData] = useState<SignInData>({});
    const updateSigninData = (newState: SignInData) => {
        setSignInData((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const onChangeAccount = (value: string) => {
        updateSigninData({ account: value });
    };

    const onChangePassword = (value: string) => {
        updateSigninData({ password: value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        updateSigninData({ errorAccount: undefined, errorPassword: undefined });
        try {
            event.preventDefault();
            const result = await APIProcessor.post({
                path: Constants.ApiPath.SIGNIN,
                data: {
                    account: signInData.account,
                    password: signInData.password,
                },
            });

            if (result.data && result.data.accessToken) {
                const userInfo: IUserInfo = {
                    id: result.data.id,
                    userName: result.data.userName,
                    email: result.data.email,
                    phoneNumber: result.data.phoneNumber,
                    roleCode: result.data.roleCode
                }
                
                sessionStorage.setItem(
                    Constants.StorageKeys.USER_INFO,
                    Helpers.ensureString(userInfo)
                );
                sessionStorage.setItem(
                    Constants.StorageKeys.ACCESS_TOKEN,
                    result.data.accessToken
                )
                dispatch(storeUserInfo(userInfo))
                navigate(Screens.HOME)
            }
        } catch (error: any) {
            console.log(error)
            if (error && error.message === "T??i kho???n kh??ng t???n t???i") {
                updateSigninData({ errorAccount: error.message })
            }
            else if (error && error.message === "M???t kh???u kh??ng ????ng") {
                updateSigninData({ errorPassword: error.message })
            }
            else {
                Helpers.showAlert(Strings.Message.COMMON_ERROR, "error")
            }
        }
        setIsLoading(false);
    };

    const onClickForgotPassword = () =>{
        navigate(Screens.FORGOT_PASSWORD);
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} md={4} className="mx-4">
                <form onSubmit={onSubmit} className="d-flex flex-column justify-content-center align-items-center">
                    <img
                        style={{ width: "50%", height: "50%" }}
                        src={Resources.Images.APP_LOGO}
                        alt="logo"
                    />

                    <TextInput
                        required
                        containerClassName="mt-4"
                        errorMessage={signInData.errorAccount}
                        onChangeValue={onChangeAccount}
                        placeholder={Strings.Auth.USER_NAME + "/" + Strings.Auth.EMAIL}
                        label={Strings.Auth.USER_NAME + "/" + Strings.Auth.EMAIL}
                        isOutline
                    />

                    <TextInput
                        required
                        containerClassName="mt-4"
                        errorMessage={signInData.errorPassword}
                        onChangeValue={onChangePassword}
                        secure
                        placeholder={Strings.Auth.PASSWORD}
                        label={Strings.Auth.PASSWORD}
                        isOutline
                    />

                    <Button
                        className="mt-3 w-100"
                        variant="contained"
                        type="submit"
                        style={{ fontWeight: "bold" }}
                        disabled={isLoading ? true : false}
                    >
                        {isLoading && (
                            <CircularProgress
                                style={{ marginRight: 10 }}
                                size={20}
                                color="inherit"
                            />
                        )}
                        <span>{Strings.Auth.SIGN_IN}</span>
                    </Button>

                    <Button
                        variant="text"
                        className="mt-2 w-100"
                        style={{ fontWeight: "bold", textTransform: "none" }}
                        onClick={onClickForgotPassword}
                    >
                        {Strings.Auth.FORGOT_PASSWORD}
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default LoginScreen;
