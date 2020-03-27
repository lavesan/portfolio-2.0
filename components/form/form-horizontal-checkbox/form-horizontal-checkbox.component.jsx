import React from 'react';

import { StyledFormHorizontalCheckbox } from './form-horizontal-checkbox.styles';

export default ({ selected, name, setFieldValue, radios = [] }) => {

    const onChange = (value) => {
        setFieldValue(name, value);
    }

    return (
        <StyledFormHorizontalCheckbox>
            {radios.map((radio, index) => 
                <div className="radio-input" key={index} onClick={() => onChange(radio.value)}>
                    <p><b>{radio.label}</b></p>
                    <div className="bottom-check">
                        <div className={`line-to-check ${selected === radio.value && 'checked-line'}`}></div>
                    </div>
                </div>
            )}
        </StyledFormHorizontalCheckbox>
    )

}
