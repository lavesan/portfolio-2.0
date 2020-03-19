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

export default ({ value, name, onChange, label }) => {

    const setFieldValue = e => {
        onChange(e.target.name, !value)
    }

    return (
        <FormControlLabel
            control={
                <GreenCheckbox
                    checked={value}
                    onChange={setFieldValue}
                    name={name}
                    color="primary"
                />
            }
            label={label}
            />
    )

}
