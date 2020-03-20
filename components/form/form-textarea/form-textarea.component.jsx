import React from 'react';

import { StyledTextArea } from './form-textarea.styles';
import { StyledFieldset } from '../form-field/form-field.styles';

export default ({ label, className, setFieldValue, name, legend, maskOnChange, validatesOnChange = [], setFormValidations, formValidations, ...textareaProps }) => {

    const onChange = (e) => {

        const value = maskOnChange ? maskOnChange(e.target.value) : e.target.value;
        setFieldValue(name, value);

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
        <StyledFieldset className={className}>
            <label htmlFor={name}>{label}</label>
            {legend ? <legend>{legend}</legend> : ''}
            <StyledTextArea
                id={name}
                name={name}
                onChange={onChange}
                rows={6}
                error={formValidations[name] && formValidations[name].invalid}
                {...textareaProps} />
        </StyledFieldset>
    )

}
