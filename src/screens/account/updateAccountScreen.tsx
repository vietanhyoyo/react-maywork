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
import Helpers from "src/commons/helpers";

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
    if (session !== null) {
        userStorage = JSON.parse(session);
    }

    //account state
    const [account, setAccount] = React.useState(() => {
        if (session !== null) {
            userStorage = JSON.parse(session);
        }
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
            setError((prev: any) => ({ ...prev, email: "Email kh??ng ????ng!" }));
            check = false;
        }
        if (!validatePhone(String(phoneNumber))) {
            setError((prev: any) => ({ ...prev, phoneNumber: "S??? ??i???n tho???i kh??ng ????ng!" }));
            check = false;
        }
        return check;
    }

    //check repassword
    const blurRePassword = () => {
        if (password.new !== "") {
            if (password.new !== password.reNew) {
                setError((prev: any) => ({ ...prev, rePassword: "M???t kh???u nh???p l???i kh??ng kh???p!" }))
            }
        }
    }

    //validate password
    const validatePassword = () => {
        let check = true;
        if (password.old === "") {
            check = false;
        }
        if (password.new === "") {
            check = false;
        }
        if (password.reNew === "") {
            check = false;
        }
        if (error.rePassword !== "") {
            check = false;
        }
        if (password.new !== password.reNew) {
            setError((prev: any) => ({ ...prev, rePassword: "M???t kh???u nh???p l???i kh??ng kh???p!" }))
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
                    password.new
                )
                alert(result.message)
                setPassword({ old: "", new: "", reNew: "" })

                console.log(result)
            } catch (error) {
                Helpers.showAlert("Thay ?????i m???t kh???u th???t b???i!", "error")
            }
        }
        else Helpers.showAlert("?????i th???t b???i!", "error");
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
                    account.phoneNumber
                )
                alert("Thay ?????i th??nh c??ng!");
                const userInfo: IUserInfo = {
                    ...userStorage,
                    email: account.email,
                    phoneNumber: account.phoneNumber
                }
                //save in session
                sessionStorage.setItem(Constants.StorageKeys.USER_INFO, JSON.stringify(userInfo))
            } catch (error) {
                console.log(error)
            }
        }
        else {
            Helpers.showAlert("Thay ?????i th???t b???i!", "error");
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ marginBottom: "18px" }}>
                                <Typography color="primary" >Th??ng tin t??i kho???n</Typography>
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
                                            label="S??? ??i???n tho???i"
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
                                        >C???P NH???T</Button>
                                    </Box>
                                </FormControl>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ marginBottom: "18px" }}>
                                <Typography color="primary" >Thay ?????i m???t kh???u</Typography>
                                <FormControl sx={{ width: "100%" }} >
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            onChangeValue={(value: any) => setPassword((prev: any) => ({ ...prev, old: value }))}
                                            secure
                                            placeholder=""
                                            label="M???t kh???u c??"
                                            isOutline
                                            value={password.old}
                                            autoComplete="off"
                                        />
                                    </Box>
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            type="password"
                                            label="M???t kh???u m???i"
                                            value={password.new}
                                            isOutline
                                            onChangeValue={(value: any) => setPassword((prev: any) => ({ ...prev, new: value }))}
                                            autoComplete="off"
                                        />
                                    </Box>
                                    <Box sx={{ mt: "30px", width: "100%" }}>
                                        <TextInput
                                            type="password"
                                            label="Nh???p l???i m???t kh???u m???i"
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
                                        >THAY ?????I</Button>
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