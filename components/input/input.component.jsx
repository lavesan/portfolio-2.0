import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledSearchInput } from './input.styles';

export default ({ placeholder, icon, button }) => {
    return (
        <StyledSearchInput icon={icon} button={button}>
            {icon && <FontAwesomeIcon icon={icon} className="search-icon" />}
            <input type="text" className="search-input" placeholder={placeholder} />
            <button type="submit" title={button.title} className="search-button">{button.text}</button>
        </StyledSearchInput>
    )
}
