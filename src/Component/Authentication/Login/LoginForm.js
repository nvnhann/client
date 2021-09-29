import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import {Button, Stack, Typography, useTheme} from "@mui/material";
import InputText from "../../Form-control/InputText";
import PasswordField from "../../Form-control/PasswordField";


LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}


export default function LoginForm(props){
    const theme = useTheme();
    const handleSubmit = async (value) => {
        const {onSubmit} = props;
        if (onSubmit) {

            await onSubmit(value);
            form.reset();
        }
    }

    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập tên đăng nhập"),
        password: yup.string().required("Vui lòng nhập mật khẩu")
    });
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema)
    });

    return(

        <form
            name="loginForm"
            noValidate
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <Stack spacing={2}>
                <Typography variant="h4" sx={{textAlign: 'center', color: theme.palette.primary.main}}>Đăng nhập</Typography>
                <InputText name="email" label="Email" form={form} fullWidth/>
                <PasswordField name="password" label="Mật khẩu" form={form}/>
                <Button
                    style={{
                        width: '22.4rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '1.6rem',
                        textTransform: 'none'
                    }}
                    variant="contained" color="primary"
                    aria-label="LOG IN"
                    type="submit"
                >
                    Đăng nhập
                </Button>
            </Stack>
        </form>
    )
}