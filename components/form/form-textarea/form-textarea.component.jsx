import React from 'react';

import { StyledTextArea } from './form-textarea.styles';
import { StyledFieldset } from '../form-field/form-field.styles';

export default ({ label, className, setFieldValue, name, legend, ...textareaProps }) => {

    const onChange = (element) => {
        setFieldValue(name, element.target.value);
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
                {...textareaProps} />
        </StyledFieldset>
    )

}
