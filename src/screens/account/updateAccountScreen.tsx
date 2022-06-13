import React from "react";
import {
    createTheme,
    ThemeProvider
} from "@mui/material/styles";
import {
    Box, Grid, Container,
    FormControl, Typography,
    Paper, Button,
    Alert
} from "@mui/material";
import Constants from "src/constants";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { IUserInfo } from "src/commons/interfaces";
import TextInput from "src/components/TextInput"
import AccountService from "src/services/account.service";

const mdTheme = createTheme({
    palette: {
        primary: {
            main: Constants.Styles.PRIMARY_COLOR,
        }
    }
});

const accountService = new AccountService()

const UpdateAccountScreen = () => {
    //get redux
    const userRedux = useSelector((state: RootState) => state.userInfo.value);
    
    //get user storage
    let userStorage: IUserInfo;
    const session = sessionStorage.getItem(Constants.StorageKeys.USER_INFO);
    if (session !== null) userStorage = JSON.parse(session); 
    //get access token
    const accessToken = sessionStorage.getItem(Constants.StorageKeys.ACCESS_TOKEN);
    
    //account state
    const [account, setAccount] = React.useState(() => {
        if (session !== null) userStorage = JSON.parse(session);
        return {
            id: userStorage.id || userRedux.id || "",
            email: userStorage.email || userRedux.email || "",
            phoneNumber: userStorage.phoneNumber || userRedux.phoneNumber || "",
        }
    })
    //password state
    const [password, setPassword] = React.useState({
        old: "",
        new: "",
        reNew: ""
    })
    //validata email
    const validateEmail = (email: string) => {
        const regexp = Constants.RegExp.NEW_EMAIL_ADDRESS;
        return regexp.test(email);
    };
    //validate phoneNumber
    const validatePhone = (phone: string) => {
        const regexp = Constants.RegExp.PHONE_NUMBER;
        return regexp.test(phone);
    }
    //error state
    const [error, setError] = React.useState({
        email: "",
        phoneNumber: "",
        rePassword: ""
    })

    //validate update information
    const validateInformation = (email: string, phoneNumber: string) => {
        let check = true;
        if (!validateEmail(String(email))) {
            setError((prev: any) => ({ ...prev, email: "Email không đúng!" }));
            check = false;
        }
        if (!validatePhone(String(phoneNumber))) {
            setError((prev: any) => ({ ...prev, phoneNumber: "Số điện thoại không đúng!" }));
            check = false;
        }
        return check;
    }

    //check repassword
    const blurRePassword = () => {
        if (password.new !== "") {
            if (password.new !== password.reNew)
                setError((prev: any) => ({ ...prev, rePassword: "Mật khẩu nhập lại không khớp!" }))
        }
    }

    //validate password
    const validatePassword = () => {
        let check = true;
        if (password.old === "") check = false;
        if (password.new === "") check = false;
        if (password.reNew === "") check = false;
        if (error.rePassword !== "") check = false;
        if (password.new !== password.reNew) {
            setError((prev: any) => ({ ...prev, rePassword: "Mật khẩu nhập lại không khớp!" }))
            check = false;
        }
        return check;
    }

    //submit password
    const submitPassword = async () => {
        if (validatePassword()) {
            try {
                const result = await accountService.updatePassword(
                    account.id,
                    password.old,
                    password.new,
                    String(accessToken)
                )
                alert(result.message)
                setPassword({ old: "", new: "", reNew: "" })

                console.log(result)
            } catch (error) {
                alert("Thay đổi mật khẩu thất bại!")
            }
        }
        else alert("Đổi thất bại!");
    }

    //submit infomation email and phoneNumber
    const submitInfomation = async () => {
        const email = account.email;
        const phoneNumber = account.phoneNumber;
        if (validateInformation(email, phoneNumber)) {
            try {
                const result = await accountService.updateProfile(
                    account.id,
                    account.email,
                    account.phoneNumber,
                    String(accessToken)
                )
                alert("Thay đổi thành công!");
                const userInfo: IUserInfo = {
                    ...userStorage,
                    email: account.email,
                    phoneNumber: account.phoneNumber
                }
                //save in session
                sessionStorage.setItem(Constants.StorageKeys.USER_INFO, JSON.stringify(userInfo))
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert("Thay đối thất bại!");
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ marginBottom: "18px" }}>
                                <Typography color="primary" >Thông tin tài khoản</Typography>
                                <FormControl sx={{ width: "100%" }} >
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            autoComplete="off"
                                            type="text"
                                            label="Email"
                                            isOutline
                                            value={account.email}
                                            onChangeValue={(value: any) => setAccount((prev: any) => ({ ...prev, email: value }))}
                                            onFocus={() => setError((prev: any) => ({ ...prev, email: "" }))}
                                        />
                                    </Box>
                                    {error.email && <Alert sx={{ mt: "10px" }} severity="error">{error.email}</Alert>}
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            autoComplete="off"
                                            type="text"
                                            label="Số điện thoại"
                                            isOutline
                                            value={account.phoneNumber}
                                            onChangeValue={(value: any) => setAccount((prev: any) => ({ ...prev, phoneNumber: value }))}
                                            onFocus={() => setError((prev: any) => ({ ...prev, phoneNumber: "" }))}
                                        />
                                    </Box>
                                    {error.phoneNumber && <Alert sx={{ mt: "10px" }} severity="error">{error.phoneNumber}</Alert>}
                                    <Box sx={{ mt: "30px", width: "100%", display: "flex", justifyContent: "center" }}>
                                        <Button
                                            variant="contained"
                                            onClick={submitInfomation}
                                        >CẬP NHẬT</Button>
                                    </Box>
                                </FormControl>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ marginBottom: "18px" }}>
                                <Typography color="primary" >Thay đổi mật khẩu</Typography>
                                <FormControl sx={{ width: "100%" }} >
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            onChangeValue={(value: any) => setPassword((prev: any) => ({ ...prev, old: value }))}
                                            secure
                                            placeholder=""
                                            label="Mật khẩu cũ"
                                            isOutline
                                            value={password.old}
                                            autoComplete="off"
                                        />
                                    </Box>
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            type="password"
                                            label="Mật khẩu mới"
                                            value={password.new}
                                            isOutline
                                            onChangeValue={(value: any) => setPassword((prev: any) => ({ ...prev, new: value }))}
                                            autoComplete="off"
                                        />
                                    </Box>
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            type="password"
                                            label="Nhập lại mật khẩu mới"
                                            isOutline
                                            value={password.reNew}
                                            onChangeValue={(value: any) => setPassword((prev: any) => ({ ...prev, reNew: value }))}
                                            onFocus={() => setError((prev: any) => ({ ...prev, rePassword: "" }))}
                                            onBlur={blurRePassword}
                                            autoComplete="off"
                                        />
                                        {error.rePassword && <Alert sx={{ mt: "10px" }} severity="error">{error.rePassword}</Alert>}
                                    </Box>
                                    <Box sx={{ mt: "30px", width: "100%", display: "flex", justifyContent: "center" }}>
                                        <Button
                                            variant="contained"
                                            onClick={submitPassword}
                                        >THAY ĐỔI</Button>
                                    </Box>
                                </FormControl>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default UpdateAccountScreen;