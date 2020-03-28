import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { StyledResponsiveSearchInput, StyledResponsiveSearchComponent } from './responsive-search-input.styles';

export default ({ children, onSubmit, onClick, setFieldValue, ...inputAttrs }) => {
    return (
        <StyledResponsiveSearchComponent>
            <FontAwesomeIcon className="search-icon" onClick={onSubmit} icon={faSearch} />
            <StyledResponsiveSearchInput onClick={onClick} onChange={setFieldValue} {...inputAttrs} />
            {children}
        </StyledResponsiveSearchComponent>
    )
}
