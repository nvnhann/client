import React from 'react';
import {unwrapResult} from '@reduxjs/toolkit';
import {useSnackbar} from "notistack";
import LoginForm from './LoginForm';
import {useDispatch} from "react-redux";
import {login} from "../../../Store/userSlice";

function Login({handleClose}) {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            const rs = await dispatch(login(values));
            unwrapResult(rs);
            if (!!handleClose) {
                handleClose();
            }
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000})
        }

    }
    return (
        <div>

            <LoginForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default Login;