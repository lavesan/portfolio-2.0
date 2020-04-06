import React, { useMemo, useState, useEffect } from 'react';

import { StyledTextArea } from './form-textarea.styles';
import { StyledFieldset } from '../form-field/form-field.styles';

export default ({ label, className, setFieldValue, name, legend, maskOnChange, validatesOnChange = [], setFormValidations, formValidation, startValidations, ...textareaProps }) => {

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

    const onChange = (e) => {

        const finalValue = maskOnChange ? maskOnChange(e.target.value) : e.target.value;
        setFieldValue(name, finalValue);
        applyValidations(finalValue);

    }

    const startErrorValidation = useMemo(
        () => {
            return (startValidations || activateValidation) ? (formValidation && formValidation.invalid ? 'true' : '') : '';
        },
        [startValidations, activateValidation, formValidation]
    )

    useEffect(() => {
        applyValidations();
    }, [])

    return (
        <StyledFieldset className={className} isTextArea={true}>
            <label htmlFor={name}>{label}</label>
            {legend ? <legend>{legend}</legend> : ''}
            <StyledTextArea
                id={name}
                name={name}
                onChange={onChange}
                rows={6}
                onFocousOut={onFocousOut}
                error={startErrorValidation}
                {...textareaProps} />
            {startErrorValidation ? <small className="error-message">{formValidation.message}</small> : ''}
        </StyledFieldset>
    )

}
