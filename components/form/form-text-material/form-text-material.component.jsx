import React, { useMemo, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const FormTextMaterial = ({ label, onChange, name, maskOnChange, validatesOnChange = [], setFormValidations, formValidations = {}, screenWidth, dispatch, value, startValidations, className, ...inputProps }) => {

    const [activateValidation, setActivationValidation] = useState(false);

    const margin = useMemo(
        () => {
            return screenWidth < 700 ? '' : 'dense';
        },
        [screenWidth]
    )

    // Activates the validation
    const onFocousOut = () => {
        setActivationValidation(true);
    }

    const applyValidations = actualValue => {

        if (validatesOnChange.length) {

            for (const validationFunc of validatesOnChange) {

                const validateValue = actualValue ? actualValue : value;

                const validation = validationFunc(validateValue, name);

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
            return (startValidations || activateValidation) ? (formValidations[name] && formValidations[name].invalid) : false;
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
    }, [value])

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
