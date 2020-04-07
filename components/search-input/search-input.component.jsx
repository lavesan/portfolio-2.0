import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledSearchInput } from './search-input.styles';

export default ({ placeholder, icon, button, onSubmit, onClick, setFieldValue, value, children = <></>, maskOnChange, loading }) => {

    const onChange = e => {

        const formatedValue = maskOnChange ? maskOnChange(e.target.value) : e.target.value;
        setFieldValue(formatedValue);

    }

    return (
        <StyledSearchInput icon={icon} button={button} onSubmit={onSubmit} loading={loading}>
            {icon && <FontAwesomeIcon icon={icon} className="search-icon" />}
            <input type="text" className="search-input" placeholder={placeholder} onClick={onClick} onChange={onChange} value={value} />
            <button type="submit" title={button.title} className="search-button">{button.text}</button>
            {children}
        </StyledSearchInput>
    )

}
