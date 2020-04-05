import React, { useEffect, useMemo, useState } from 'react';

import { StyledNeultralInput } from '../form-input';
import { StyledFieldset } from './form-field.styles';

export default ({ label, name, setFieldValue, className, setFormValidations, formValidation, startValidations, validatesOnChange = [], maskOnChange, onFocusOut, value, ...inputProps }) => {

    const [activateValidation, setActivationValidation] = useState(false);

    // Activates the validation
    const activateOnFocusOut = () => {
        setActivationValidation(true);
        if (onFocusOut) {
            onFocusOut();
        }
    }

    const applyValidations = actualValue => {

        if (validatesOnChange.length) {

            const validateValue = actualValue ? actualValue : value;
            
            for (const validationFunc of validatesOnChange) {

                const validation = validationFunc(validateValue, name);
    
                setFormValidations({
                    [name]: {
                        invalid: !validation.valid,
                        message: validation.message,
                    },
                });
    
                if (!validation.valid) {
                    break;
                }

            }

        }

    }

    const startErrorValidation = useMemo(
        () => {
            return (startValidations || activateValidation) ? (formValidation && formValidation.invalid) : false;
        },
        [startValidations, formValidation, activateValidation]
    )

    const onChange = (element) => {

        const finalValue = maskOnChange ? maskOnChange(element.target.value) : element.target.value;
        setFieldValue(name, finalValue);
        applyValidations(finalValue);

    }

    useEffect(() => {
        applyValidations();
    }, [value])

    return (
        <StyledFieldset className={className}>
            {label && <label htmlFor={name}>{label}</label>}
            <StyledNeultralInput
                id={name}
                error={startErrorValidation}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={activateOnFocusOut}
                {...inputProps} />
            {startErrorValidation ? <small className="error-message">{formValidation.message}</small> : ''}
        </StyledFieldset>
    )

}
