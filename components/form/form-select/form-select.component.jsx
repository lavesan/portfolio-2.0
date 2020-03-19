import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(() => ({
    select: {
        width: '100%',
    },
}));

export default ({ label, value, name, options = [], onChange, error, errorMessage }) => {

    const classes = useStyles();

    const setFieldValue = (e) => {
        onChange(name, e.target.value);
    }

    return (
        <div>
            <FormControl
                variant="outlined"
                error={error}
                margin="dense"
                className={classes.select}>
                <InputLabel id={`select=${name}`}>{label}</InputLabel>
                <Select
                    native
                    className={classes.select}
                    labelId={`select=${name}`}
                    value={value}
                    onChange={setFieldValue}
                    label={label}
                >
                    {options.map(opt => (
                        <option value={opt.value}>{opt.label}</option>
                    ))}
                </Select>
                {error && <FormHelperText>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    )

}
