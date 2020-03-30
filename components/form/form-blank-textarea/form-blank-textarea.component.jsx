import React from 'react';

import { StyledFieldset } from '../form-field/form-field.styles';
import { StyledBlankTextarea } from './form-blank-textarea.styles';

export default ({ label, className, setFieldValue, name, legend, isOptional, value, ...textareaProps }) => {

    const onChange = (e) => {

        const finalValue = e.target.value;
        setFieldValue(name, e.target.value);

    }

    return (
        <StyledFieldset className={className} isTextArea={true} fieldHeight={130}>
            {label && <label htmlFor={name}>{label}</label>}
            {legend ? <legend style={{ marginBottom: 9 }}>{legend}</legend> : ''}
            <StyledBlankTextarea
                id={name}
                name={name}
                onChange={onChange}
                rows={6}
                value={value}
                {...textareaProps} />
            {isOptional && <small className="optional-message">Opcional</small>}
        </StyledFieldset>
    )

}
