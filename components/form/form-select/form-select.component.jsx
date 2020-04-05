import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const FormSelectComponent = ({ label, value, name, options = [], onChange, validatesOnChange = [], setFormValidations, formValidations = {}, screenWidth, startValidations }) => {

    const margin = useMemo(
        () => {
            return screenWidth < 700 ? '' : 'dense';
        },
        [screenWidth]
    )

    const applyValidations = actualValue => {
        
        if (validatesOnChange.length) {

            for (const validationFunc of validatesOnChange) {

                const validateValue = actualValue ? actualValue : value;

                const validation = validationFunc(validateValue, name);
    
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

    const startErrorValidation = useMemo(
        () => {
            return startValidations ? (formValidations[name] && formValidations[name].invalid ? 'true' : '') : '';
        },
        [startValidations, formValidations]
    )

    const setFieldValue = (e) => {

        onChange(name, e.target.value);
        applyValidations();

    }

    useEffect(() => {
        applyValidations();
    }, [startValidations])

    return (
        <div
            style={{
                width: '100%',
                height: margin ? 67 : 85,
            }}>
            <FormControl
                variant="outlined"
                margin={margin}
                style={{
                    width: '100%',
                    height: margin ? 67 : 85,
                }}
                error={startErrorValidation}>
                <InputLabel id={`select=${name}`}>{label}</InputLabel>
                <Select
                    native
                    labelId={`select=${name}`}
                    value={value}
                    onChange={setFieldValue}
                    label={label}
                >
                    {options.map(opt => (
                        <option value={opt.value}>{opt.label}</option>
                    ))}
                </Select>
                {startErrorValidation && <FormHelperText>{formValidations[name].message}</FormHelperText>}
            </FormControl>
        </div>
    )

}

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(FormSelectComponent);
