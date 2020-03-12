import React from 'react';
import { StyledFormRadio } from './form-radio.styles';

export default ({ name, label, value, setFieldValue }) => {

    const onChange = () => {
        setFieldValue(name, value);
    }

    return (
        <StyledFormRadio>
            <div id={name} className="circle" onClick={onChange}></div>
            <label htmlFor={name} onClick={onChange}>{label}</label>
        </StyledFormRadio>
    )
}
