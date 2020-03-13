import React from 'react';
import { StyledFormRadio } from './form-radio.styles';

export default ({ name, label, value, setFieldValue, selectValue }) => {

    const onChange = () => {
        setFieldValue(name, value);
    }

    return (
        <StyledFormRadio onClick={onChange}>
            <div id={name} className="circle">
                <div className={selectValue == value ? 'selected' : ''}></div>
            </div>
            <label htmlFor={name}>{label}</label>
        </StyledFormRadio>
    )
}
