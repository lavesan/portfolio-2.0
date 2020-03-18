import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

export default ({ label, onChange, ...inputProps }) => (
    <TextField
        label={label}
        outlined={true}
        dense={true}>
            <Input
                onChange={e => onChange(e.target.name, e.target.value)}
                {...inputProps} />
    </TextField>
)
