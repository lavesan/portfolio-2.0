import React from 'react';
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

export default ({ value, name, onChange, label, validatesOnChange = [], setFormValidations, formValidations }) => {

    const setFieldValue = () => {

      onChange(name, !value)
      
      if (validatesOnChange.length) {
        
        for (const validationFunc of validatesOnChange) {

          const validation = validationFunc(value, name);

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

    return (
        <FormControlLabel
            control={
                <GreenCheckbox
                    checked={value}
                    onChange={setFieldValue}
                    name={name}
                    error={formValidations[name] && formValidations[name].invalid}
                    color="primary"
                />
            }
            label={label}
            />
    )

}
