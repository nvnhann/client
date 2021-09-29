import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {TextField} from "@mui/material";


InputText.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    rows: PropTypes.number
}

export default function InputText(props) {
    const {form, name, label, disabled, fullWidth, rows} = props;
    const {errors} = form;
    const hasError = errors[name];
    // console.log(errors[name])
    return (
        <Controller
            variant="outlined"
            margin="normal"
            name={name}
            control={form.control}
            as={TextField}
            fullWidth={fullWidth}
            label={label}
            disabled={disabled}
            error={!!hasError}
            helperText={errors[name]?.message}
            rows={rows}
        />
    )
}