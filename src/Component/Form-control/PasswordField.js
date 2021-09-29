import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
}

export default function PasswordField(props) {
    const {form, name, label, disabled} = props;
    const {errors} = form;
    const hasError = errors[name];
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }

    // console.log(errors[name])
    return (
        <div>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                <Controller
                    name={name}
                    control={form.control}
                    as={OutlinedInput}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    disabled={disabled}
                    error={!!hasError}
                />
                <FormHelperText error={!!hasError}>
                    {errors[name]?.message}
                </FormHelperText>
            </FormControl>
        </div>
    )
}