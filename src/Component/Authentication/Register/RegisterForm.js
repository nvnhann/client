import {useSnackbar} from "notistack";
import React, {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import InputText from "../../Form-control/InputText";
import PasswordField from "../../Form-control/PasswordField";
import OtpAPI from "../../../API/OtpAPI";


RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default function RegisterForm(props) {
    const {enqueueSnackbar} = useSnackbar();
    const [check, setCheck] = useState(false);
    const [checkotp, setCheckotp] = useState(false);
    const theme = useTheme();

    const handleSubmit = async (value) => {
        const {onSubmit} = props;
        if (onSubmit) {
            await onSubmit(value);
        }
    }

    const getOTP = async (value) => {
        try{
            await OtpAPI.get({email: value});
            setCheckotp(true);
        }catch (err){
            enqueueSnackbar(err.message, {variant: 'error', autoHideDuration: 2000})
        }
    }

    const otpSubmit = async (value) => {
        if(value.otp==='') return;
        try {
            await OtpAPI.post({otp:value.otp, email:value.email});
            enqueueSnackbar("Xác nhận thành công!", {variant: 'success', autoHideDuration: 2000})
            setTimeout(()=>{ form.setValue('email',value.email)}, 100);
            console.log(form.getValues('email'))
            setCheck(true);
        }catch (err){
            enqueueSnackbar(err.message, {variant: 'error', autoHideDuration: 2000})
        }
    }

    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập email").email('Email không hơp lệ  '),
        password: yup.string().required("Vui lòng nhập mật khảu").min(8, 'Mật khẩu ít nhất 8 ký tự'),
        repwd: yup.string().required("Vui lòng nhập lại mật khảu").oneOf([yup.ref('password')], 'Mật khẩu không khớp')

    });
    const schemaOtp = yup.object().shape({
        email: yup.string().required("Vui lòng nhập email").email('Email không hơp lệ  '),
        otp: yup.string().required("Vui lòng nhập mã otp")

    });
    const formOTP = useForm({
        defaultValues: {
            email: '',
            otp: ''
        },
        resolver: yupResolver(schemaOtp)
    })


    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            repwd: ''
        },
        resolver: yupResolver(schema)
    });

    if (check) {
        return (
            <form
                name="loginForm"
                noValidate
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <Stack spacing={2}>
                    <Typography variant="h4" sx={{textAlign: 'center', color: theme.palette.primary.main}}>Đăng ký</Typography>
                    <InputText name="email" label="Email" form={form} fullWidth/>
                    <PasswordField name="password" label="Mật khẩu" form={form}/>
                    <PasswordField name="repwd" label="Nhập lại mật khẩu" form={form}/>
                    <Button
                        style={{
                            width: '22.4rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '1.6rem',
                            textTransform: 'none'
                        }}
                        variant="contained" color="primary"
                        aria-label="otp"
                        type="submit"
                    >
                        Đăng ký
                    </Button>
                </Stack>

            </form>
        )
    } else {
        return (
            <form onClick={formOTP.handleSubmit(otpSubmit)}>
                 <Typography variant="h4" sx={{textAlign: 'center', color: theme.palette.primary.main}}>Đăng ký</Typography>
                 <InputText name="email" label="Email" form={formOTP} fullWidth/>
                {!checkotp ? (
                    <Box textAlign="center" sx={{my: 2}}>
                        <Button
                            style={{
                                width: '22.4rem',
                                margin: '0 auto',
                                textTransform: 'none'
                            }}
                            variant="contained" color="primary"
                            aria-label="LOG IN"
                            onClick={()=>{
                                const email = formOTP.getValues('email');
                                getOTP(email);
                            }}
                        >
                            Lấy mã OTP
                        </Button>
                    </Box>
                ):(<>
                        <InputText name="otp" label="Nhập mã OTP" form={formOTP} fullWidth/>
                        <Box textAlign="center" sx={{my: 2}}>
                            <Button
                                style={{
                                    width: '22.4rem',
                                    margin: '0 auto',
                                    textTransform: 'none'
                                }}
                                variant="contained" color="primary"
                                aria-label="LOG IN"
                                type="submit"
                            >
                                Xác nhận
                            </Button></Box> </>)}

            </form>)}
}