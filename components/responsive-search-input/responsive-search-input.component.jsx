import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { StyledResponsiveSearchInput, StyledResponsiveSearchComponent } from './responsive-search-input.styles';

export default ({ ...inputAttrs }) => {
    return (
        <StyledResponsiveSearchComponent>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <StyledResponsiveSearchInput {...inputAttrs} />
        </StyledResponsiveSearchComponent>
    )
}
