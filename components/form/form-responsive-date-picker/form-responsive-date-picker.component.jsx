import React, { useEffect, useMemo, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import { StyledInputDatePicker, StyledParagraphDate } from './form-responsive-date-picker.styles';
import { StyledFieldset } from '../form-field/form-field.styles';

export default ({ label, name, setFieldValue, className, setFormValidations, formValidation, startValidations, validatesOnChange = [], maskOnChange, value, ...inputProps }) => {

    const [activateValidation, setActivationValidation] = useState(false);

    const inputRef = useRef(null);

    // Activates the validation
    const activateOnFocusOut = () => {
        setActivationValidation(true);
    }

    const applyValidations = actualValue => {

        if (validatesOnChange.length) {
            
            for (const validationFunc of validatesOnChange) {

                const validateValue = actualValue ? actualValue : value;

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
            return (startValidations || activateValidation) ? (formValidation && formValidation.invalid) : false;
        },
        [startValidations, formValidation, activateValidation]
    )

    const onChange = e => {

        const toBrDate = moment(e.target.value, 'YYYY-MM-DD').format('DD/MM/YYYY');

        setFieldValue(name, toBrDate);
        applyValidations(toBrDate);

    }

    const onIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }
    
    useEffect(() => {
        applyValidations();
    }, [value])

    return (
        <StyledFieldset className={className}>
            <label htmlFor={name}>{label}</label>
            <StyledInputDatePicker ref={inputRef} onBlur={activateOnFocusOut} type="date" min={moment().format('YYYY-MM-DD')} onChange={onChange} {...inputProps} />
            <StyledParagraphDate onClick={onIconClick}>{typeof value === 'object' ? '' : value}</StyledParagraphDate>
            <FontAwesomeIcon onClick={onIconClick} className="responsive-datepicker-icon" icon={faCalendarAlt} />
            {startErrorValidation ? <small className="error-message">{formValidation.message}</small> : ''}
        </StyledFieldset>
    )

}
