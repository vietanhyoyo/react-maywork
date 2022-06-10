import React from 'react';
import {
    createTheme,
    ThemeProvider
}
    from '@mui/material/styles';
import {
    Box, Grid, Container, OutlinedInput,
    FormControl, Typography,
    Paper, TextField, Button,
    Alert, InputAdornment, IconButton
} from '@mui/material';
import Constants from 'src/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IUserInfo } from 'src/commons/interfaces';
import APIProcessor from 'src/services/apiProcessor';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextInput from "src/components/TextInput"

const mdTheme = createTheme({
    palette: {
        primary: {
            main: Constants.Styles.PRIMARY_COLOR,
        }
    }
});


const UpdateAccountScreen = () => {

    const userRedux = useSelector((state: RootState) => state.userInfo.value);
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
        old: '',
        new: '',
        reNew: ''
    })


    //validata email
    const validateEmail = (email: string) => {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email);
    };
    //validate phoneNumber
    // const validatePhone = (phone: string) => {
    //     const regexp = Constants.RegExp.PHONE_NUMBER;
    //     return regexp.test(phone);
    // }
    //error state
    const [error, setError] = React.useState({
        email: '',
        phoneNumber: '',
        rePassword: ''
    })

    //validate update information
    const validateInformation = (email: string, phoneNumber: string) => {
        let check = true;
        if (!validateEmail(String(email))) {
            setError((prev: any) => ({ ...prev, email: 'Email không đúng!' }));
            check = false;
        }
        if (phoneNumber.length !== 10 || phoneNumber.charAt(0) !== '0') {
            setError((prev: any) => ({ ...prev, phoneNumber: 'Số điện thoại không đúng!' }));
            check = false;
        }
        return check;
    }
    //check repassword
    const blurRePassword = () => {
        if (password.new !== '') {
            if (password.new !== password.reNew)
                setError((prev: any) => ({ ...prev, rePassword: 'Mật khẩu nhập lại không khớp!' }))
        }
    }
    //validate password
    const validatePassword = () => {
        let check = true;
        if (password.old === '') check = false;
        if (password.new === '') check = false;
        if (password.reNew === '') check = false;
        if (error.rePassword !== '') check = false;
        if (password.new !== password.reNew) {
            setError((prev: any) => ({ ...prev, rePassword: 'Mật khẩu nhập lại không khớp!' }))
            check = false;
        }
        return check;
    }
    //submit password
    const submitPassword = () => {
        if (validatePassword()) {
            const accessToken = sessionStorage.getItem(Constants.StorageKeys.ACCESS_TOKEN);
            APIProcessor.post({
                data: {
                    id: account.id,
                    oldPassword: password.old,
                    newPassword: password.new
                },
                path: Constants.ApiPath.UPDATE_PASSWORD,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "x-access-token": accessToken
                }
            })
                .then(res => res.data)
                .then(res => {
                    console.log(res)
                    alert(res.message);
                    setPassword({ old: '', new: '', reNew: '' });
                })
                .catch(err => {
                    console.log(err);
                    if (err.code === 400) alert(err.message);
                });
        }
        else alert('Đổi thất bại!');

    }

    //submit infomation email and phoneNumber
    const submitInfomation = () => {
        const email = account.email;
        const phoneNumber = account.phoneNumber;
        if (validateInformation(email, phoneNumber)) {
            const accessToken = sessionStorage.getItem(Constants.StorageKeys.ACCESS_TOKEN);
            APIProcessor.post({
                data: {
                    id: account.id,
                    email: account.email,
                    phoneNumber: account.phoneNumber
                },
                path: Constants.ApiPath.UPDATE_ACCOUNT,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "x-access-token": accessToken
                }
            })
                .then(res => res.data)
                .then(res => {
                    console.log(res)
                    const userInfo: IUserInfo = {
                        ...userStorage,
                        email: account.email,
                        phoneNumber: account.phoneNumber
                    }
                    sessionStorage.setItem(Constants.StorageKeys.USER_INFO, JSON.stringify(userInfo))
                    alert('Thay đổi thành công!');
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Thay đối thất bại!");
        }
    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ marginBottom: '18px' }}>
                                <Typography color='primary' >Thông tin tài khoản</Typography>
                                <FormControl sx={{ width: '100%' }} >
                                    <Box sx={{ mt: '30px', width: '100%' }}>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            value={account.email}
                                            onChange={(e: any) => setAccount((prev: any) => ({ ...prev, email: e.target.value }))}
                                            onFocus={() => setError((prev: any) => ({ ...prev, email: '' }))}
                                        />
                                    </Box>
                                    {error.email && <Alert sx={{ mt: '10px' }} severity="error">{error.email}</Alert>}
                                    <Box sx={{ mt: '30px', width: '100%' }}>
                                        <TextField
                                            label="Số điện thoại"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            value={account.phoneNumber}
                                            onChange={(e: any) => setAccount((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
                                            onFocus={() => setError((prev: any) => ({ ...prev, phoneNumber: '' }))}
                                        />
                                    </Box>
                                    {error.phoneNumber && <Alert sx={{ mt: '10px' }} severity="error">{error.phoneNumber}</Alert>}
                                    <Box sx={{ mt: '30px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={submitInfomation}
                                        >
                                            CẬP NHẬT
                                        </Button>
                                    </Box>
                                </FormControl>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ marginBottom: '18px' }}>
                                <Typography color='primary' >Thay đổi mật khẩu</Typography>
                                <FormControl sx={{ width: '100%' }} >
                                    <Box sx={{ mt: '30px', width: '100%' }}>
                                        {/* <TextField
                                            label="Mật khẩu cũ"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            type={values.showPassword ? 'text' : 'password'}
                                            variant="outlined"
                                            value={password.old}
                                            sx={{ width: '100%' }}
                                            color="primary"
                                            onChange={(e: any) => setPassword((prev: any) => ({ ...prev, old: e.target.value }))}
                                        /> */}
                                        <TextInput
                                            containerClassName="mt-4"
                                            onChangeValue={(value: any) => setPassword((prev: any) => ({ ...prev, old: value }))}
                                            secure
                                            placeholder=""
                                            label="Mật khẩu cũ"
                                            isOutline
                                            value={password.old}
                                        />
                                    </Box>
                                    <Box sx={{ mt: '30px', width: '100%' }}>
                                        <TextField
                                            type={values.showPassword ? 'text' : 'password'}
                                            label="Mật khẩu mới"
                                            variant="outlined"
                                            value={password.new}
                                            sx={{ width: '100%' }}
                                            onChange={(e: any) => setPassword((prev: any) => ({ ...prev, new: e.target.value }))}
                                        />
                                    </Box>
                                    <Box sx={{ mt: '30px', width: '100%' }}>
                                        <TextField
                                            type={values.showPassword ? 'text' : 'password'}
                                            label="Nhập lại mật khẩu mới"
                                            variant="outlined"
                                            value={password.reNew}
                                            sx={{ width: '100%' }}
                                            onChange={(e: any) => setPassword((prev: any) => ({ ...prev, reNew: e.target.value }))}
                                            onFocus={() => setError((prev: any) => ({ ...prev, rePassword: '' }))}
                                            onBlur={blurRePassword}
                                        />
                                        {error.rePassword && <Alert sx={{ mt: '10px' }} severity="error">{error.rePassword}</Alert>}
                                    </Box>
                                    <Box sx={{ mt: '30px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={submitPassword}
                                        >
                                            THAY ĐỔI
                                        </Button>
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