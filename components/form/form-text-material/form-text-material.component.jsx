import React, { useMemo, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const FormTextMaterial = ({ label, onChange, name, maskOnChange, validatesOnChange = [], setFormValidations, formValidations = {}, screenWidth, dispatch, value, startValidations, className, ...inputProps }) => {

    const margin = useMemo(
        () => {
            return screenWidth < 700 ? '' : 'dense';
        },
        [screenWidth]
    )

    const [activateValidation, setActivationValidation] = useState(false);

    // Activates the validation
    const onFocousOut = () => {
        setActivationValidation(true);
    }

    const applyValidations = value => {
        
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
    
    const startErrorValidation = useMemo(
        () => {
            const invalido = (startValidations || activateValidation) ? (formValidations[name] && formValidations[name].invalid) : false;
            return invalido;
        },
        [startValidations, activateValidation, formValidations]
    )

    const setFieldValue = (e) => {

        const finalValue = maskOnChange ? maskOnChange(e.target.value) : e.target.value;
        onChange(name, finalValue);
        applyValidations(finalValue);

    }

    useEffect(() => {
        applyValidations();
    }, [])

    return (
        <TextField
            style={{
                width: '100%',
                height: margin ? 55 : 85,
            }}
            className={className}
            label={label}
            variant="outlined"
            onChange={setFieldValue}
            onBlur={onFocousOut}
            error={startErrorValidation}
            margin={margin}
            helperText={startErrorValidation ? formValidations[name].message : ''}
            name={name}
            value={value}
            {...inputProps}
            />
    )

}

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(FormTextMaterial);
