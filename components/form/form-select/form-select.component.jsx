import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

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

const FormSelectComponent = ({ label, value, name, options = [], onChange, validatesOnChange = [], setFormValidations, formValidations = {}, screenWidth }) => {

    const classes = useStyles();

    const margin = useMemo(
        () => {
            return screenWidth < 700 ? '' : 'dense';
        },
        [screenWidth]
    )

    const applyValidation = () => {
        
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

    const setFieldValue = (e) => {

        onChange(name, e.target.value);
        applyValidation();

    }

    useEffect(() => {
        applyValidation();
    }, [])

    return (
        <div>
            <FormControl
                variant="outlined"
                margin={margin}
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

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(FormSelectComponent);
