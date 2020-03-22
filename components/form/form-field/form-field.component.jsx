import React, { useEffect } from 'react';

import { StyledNeultralInput } from '../form-input';
import { StyledFieldset } from './form-field.styles';

export default ({ label, name, setFieldValue, className, setFormValidations, formValidations = {}, ...inputProps }) => {
    
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
                error={formValidations[name] && formValidations[name].invalid}
                name={name}
                onChange={onChange}
                {...inputProps} />
            {formValidations[name] && formValidations[name].invalid ? <small className="error-message">{formValidations[name].message}</small> : ''}
        </StyledFieldset>
    )

}
