import { useState } from "react"
import { Grid, Button, CircularProgress } from "@mui/material"
import Logo from "src/assets/logo.png"
import Helpers from "src/commons/helpers"
import TextInput from "src/components/TextInput"
import Constants from "src/constants"
import APIProcessor from "src/services/apiProcessor"
import { useDispatch} from "react-redux"
import { storeUserInfo } from "src/store/slice/userInfo.slice"
import { IUserInfo } from "src/commons/interfaces"
import { useNavigate } from "react-router"
import Screens from "src/constants/screens"

interface SignInData {
    account ?: string,
    password ?: string,
    errorAccount ?: string,
    errorPassword ?: string
}

const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [signInData, setSignInData] = useState<SignInData>({})
    const updateSigninData = (newState: SignInData) => {
        setSignInData((prevState) => ({
            ...prevState,
            ...newState
        }))
    }

    const onChangeAccount = (value: string) => {
        updateSigninData({ account: value })
    }

    const onChangePassword = (value: string) => {
        updateSigninData({ password: value })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        updateSigninData({ errorAccount: undefined, errorPassword: undefined })
        try {
            event.preventDefault()
            const result = await APIProcessor.post({
                path: Constants.ApiPath.SIGNIN,
                data: {
                    account: signInData.account,
                    password: signInData.password
                }
            })

            if (result.data && result.data.accessToken) {
                sessionStorage.setItem(Constants.StorageKeys.ACCESS_TOKEN, result.data.accessToken)
                const userInfo: IUserInfo = {
                    id: result.data.id,
                    userName: result.data.userName,
                    email: result.data.email,
                    phoneNumber: result.data.phoneNumber,
                    roleCode: result.data.roleCode
                }
                dispatch(storeUserInfo(userInfo))
                navigate(Screens.HOME)
            }
        } catch (error: any) {
            console.log(error)
            if (error && error.message === "Tài khoản không tồn tại") {
                updateSigninData({ errorAccount: error.message })
            }
            else if (error && error.message === "Mật khẩu không đúng") {
                updateSigninData({ errorPassword: error.message })
            }
            else {
                Helpers.showAlert("Đã xảy ra lỗi, vui lòng thử lại")
            }
        }
        setIsLoading(false)
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} md={4} className="mx-4">
                <form onSubmit={onSubmit} className="d-flex flex-column justify-content-center align-items-center">
                    <img
                        style={{ width: "50%", height: "50%" }}
                        src={Logo}
                        alt="logo"
                    />

                    <TextInput
                        required
                        containerClassName="mt-4"
                        errorMessage={signInData.errorAccount}
                        onChangeValue={onChangeAccount}
                        placeholder="Tên đăng nhập/Email"
                        label="Tên đăng nhập/Email"
                        isOutline
                    />

                    <TextInput
                        required
                        containerClassName="mt-4"
                        errorMessage={signInData.errorPassword}
                        onChangeValue={onChangePassword}
                        secure
                        placeholder="Mật khẩu"
                        label="Mật khẩu"
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
                        <span>Đăng nhập</span>
                    </Button>

                    <Button
                        variant="text"
                        className="mt-2 w-100"
                        style={{ fontWeight: "bold", textTransform: "none" }}
                    >
                        Quên mật khẩu
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default LoginScreen