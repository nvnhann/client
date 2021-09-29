import React from 'react';
import RegisterForm from "./RegisterForm";
import {useSnackbar} from 'notistack';
import userAPI from "../../../API/userAPI";

function Register({handleClose}) {
    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            await userAPI.signup(values);
            enqueueSnackbar('Đăng ký thành công', {variant: 'success', autoHideDuration: 2000});
            if(handleClose){
                handleClose();
            }
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000})
            console.log(error)
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default Register;