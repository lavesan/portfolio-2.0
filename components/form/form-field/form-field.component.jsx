import React, { useEffect, useMemo } from 'react';

import { StyledNeultralInput } from '../form-input';
import { StyledFieldset } from './form-field.styles';

export default ({ label, name, setFieldValue, className, setFormValidations, formValidations = {}, startValidations, ...inputProps }) => {
    
    const applyValidations = () => {
        
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
            return startValidations ? (formValidations[name] && formValidations[name].invalid) : false;
        },
        [startValidations, formValidations]
    )

    const onChange = (element) => {

        setFieldValue(name, element.target.value);
        applyValidations();

    }

    useEffect(() => {
        applyValidations();
    }, [])

    return (
        <StyledFieldset className={className}>
            <label htmlFor={name}>{label}</label>
            <StyledNeultralInput
                id={name}
                error={startErrorValidation}
                name={name}
                onChange={onChange}
                {...inputProps} />
            {startErrorValidation ? <small className="error-message">{formValidations[name].message}</small> : ''}
        </StyledFieldset>
    )

}
