import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    input: {
        width: '100%',
    },
}));

export default ({ label, onChange, name, maskOnChange, validatesOnChange = [], setFormValidations, formValidations = {}, ...inputProps }) => {

    const classes = useStyles();

    const setFieldValue = (e) => {

        const value = maskOnChange ? maskOnChange(e.target.value) : e.target.value;

        onChange(e.target.name, value);

        if (validatesOnChange.length) {

            for (const validationFunc of validatesOnChange) {

                const validation = validationFunc(value, name);
    
                setFormValidations(function(f) {
                    return {
                        ...f,
                        [name]: {
                            invalid: !validation.valid,
                            message: validation.message,
                        },
                    }
                });
    
                if (!validation.valid) {
                    break;
                }

            }

        }
    }

    return (
        <TextField
            className={classes.input}
            label={label}
            variant="outlined"
            onChange={setFieldValue}
            error={formValidations[name] && formValidations[name].invalid}
            margin="dense"
            helperText={formValidations[name] && formValidations[name].invalid ? formValidations[name].message : ''}
            name={name}
            {...inputProps}
            />
    )
}
