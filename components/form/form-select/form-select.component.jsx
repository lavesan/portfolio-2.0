import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(() => ({
    select: {
        width: '100%',
    },
}));

export default ({ label, value, name, options = [], onChange, validatesOnChange = [], setFormValidations, formValidations = {} }) => {

    const classes = useStyles();

    const setFieldValue = (e) => {

        onChange(name, e.target.value);
        
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
        <div>
            <FormControl
                variant="outlined"
                margin="dense"
                error={formValidations[name] && formValidations[name].invalid}
                className={classes.select}>
                <InputLabel id={`select=${name}`}>{label}</InputLabel>
                <Select
                    native
                    className={classes.select}
                    labelId={`select=${name}`}
                    value={value}
                    onChange={setFieldValue}
                    label={label}
                >
                    {options.map(opt => (
                        <option value={opt.value}>{opt.label}</option>
                    ))}
                </Select>
                {formValidations[name] && formValidations[name].invalid && <FormHelperText>{formValidations[name].message}</FormHelperText>}
            </FormControl>
        </div>
    )

}
