import React, { useEffect, useMemo } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

export default ({ value, name, onChange, label, validatesOnChange = [], setFormValidations, formValidations, startValidations, style }) => {

  const applyValidations = actualValue => {

    if (validatesOnChange.length) {
      
      for (const validationFunc of validatesOnChange) {

        const validation = validationFunc(actualValue, name);

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
        return startValidations ? (formValidations[name] && formValidations[name].invalid) : false;
    },
    [startValidations, formValidations]
  )

  const setFieldValue = () => {

    onChange(name, !value)
    applyValidations(!value);

  }
    
  useEffect(() => {
    applyValidations(value);
  }, [])

  return (
      <FormControlLabel
        style={style}
          control={
              <GreenCheckbox
                // style={style}
                checked={value}
                onChange={setFieldValue}
                name={name}
                error={startErrorValidation}
                color="primary"
              />
          }
          label={label}
          />
  )

}
