import React from 'react';

import { StyledNeultralInput } from '../form-input';
import { StyledFieldset } from './form-field.styles';

export default ({ label, name, setFieldValue, ...inputProps }) => {
    
    const onChange = (element) => {
        setFieldValue(name, element.target.value);
    }

    return (
        <StyledFieldset>
            <label htmlFor={name}>{label}</label>
            <StyledNeultralInput id={name} name={name} onChange={onChange} {...inputProps} />
        </StyledFieldset>
    )

}
