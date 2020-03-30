import React, { useMemo, useEffect } from 'react';

import { StyledOrderFormSelect, StyledOrderFormSelectField } from './form-order-select.styles';

export default ({ label, name, value, setFieldValue, className, setFormValidations, formValidation, startValidations, validatesOnChange = [], options, ...selectAttrs }) => {

    const applyValidations = actualValue => {

        if (validatesOnChange.length) {
            
            for (const validationFunc of validatesOnChange) {

                const validateValue = actualValue ? actualValue : (value.value ? value.value : value);

                console.log('validateValue: ', validateValue);

                const validation = validationFunc(validateValue, name);
    
                setFormValidations({
                    [name]: {
                        invalid: !validation.valid,
                        message: validation.message,
                    },
                });
    
                if (!validation.valid) {
                    break;
                }

            }

        }

    }

    const startErrorValidation = useMemo(
        () => {
            return startValidations ? (formValidation && formValidation.invalid) : false;
        },
        [startValidations, formValidation]
    )

    const onChange = (selected) => {
        setFieldValue(name, selected);
        applyValidations(selected.value);
    }
    
    useEffect(() => {
        applyValidations();
    }, [startValidations])
  
    const colourStyles = {
        control: styles => ({
            ...styles,
            minHeight: 37,
            maxHeight: 37,
            height: 37,
            padding: 0,
            overflow: 'hidden',
        }),
    };

    return (
        <StyledOrderFormSelectField className={className} error={startErrorValidation}>
            {label && <label htmlFor={name}>{label}</label>}
            <StyledOrderFormSelect
                id={name}
                onChange={selectOpt => {
                    if (selectOpt) {
                        onChange(selectOpt);
                    }
                }}
                value={value}
                options={options}
                styles={colourStyles}
                {...selectAttrs} />
            {startErrorValidation && <small className="error-message">{formValidation.message}</small>}
        </StyledOrderFormSelectField>
    )

}
