import React from 'react';
import { StyledFormRadio, StyledRadioFormContainer } from './form-radio.styles';

export const FormRadioComponent = ({ name, setFieldValue, radios = [], selectedId, row }) => {

    const onChange = (selectedValue) => {
        setFieldValue(name, selectedValue);
    }

    return (
        <StyledRadioFormContainer row={row}>
            {radios.map(radio => (
                <StyledFormRadio key={radio.value.id} onClick={() => onChange(radio)} isSelected={radio.value.id == selectedId}>
                    <div id={radio.value.id} className="circle">
                        <div className="selected"></div>
                    </div>
                    <div className="label" htmlFor={radio.value.id}>{radio.label}</div>
                </StyledFormRadio>
            ))}
        </StyledRadioFormContainer>
    )
}

export const FormRadioComponentRow = ({ name, setFieldValue, radios = [], selected, ...props }) => {

    const onChange = (selectedValue) => {
        setFieldValue(name, selectedValue);
    }
    
    return (
        <StyledRadioFormContainer row={true} {...props}>
            {radios.map(radio => (
                <StyledFormRadio key={radio.value} onClick={() => onChange(radio.value)} isSelected={radio.value == selected}>
                    <div id={radio.value} className="circle">
                        <div className="selected"></div>
                    </div>
                    <div className="label" htmlFor={radio.value}>{radio.label}</div>
                </StyledFormRadio>
            ))}
        </StyledRadioFormContainer>
    )

}
