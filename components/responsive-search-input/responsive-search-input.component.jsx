import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { StyledResponsiveSearchInput, StyledResponsiveSearchComponent } from './responsive-search-input.styles';

export default ({ children, onSubmit, onClick, setFieldValue, ...inputAttrs }) => {

    const [showSearchIcon, setShowSearchIcon] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowSearchIcon(true);
        }, 100);
    }, [])

    return (
        <StyledResponsiveSearchComponent>
            {showSearchIcon && <FontAwesomeIcon className="search-icon" onClick={onSubmit} icon={faSearch} />}
            <StyledResponsiveSearchInput onClick={onClick} onChange={setFieldValue} {...inputAttrs} />
            {children}
        </StyledResponsiveSearchComponent>
    )

}
