import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { StyledSearchInput } from './input.styles';

export default () => {
    return (
        <StyledSearchInput>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" className="search-input" placeholder="Procurar produtos" />
            <button type="button" className="search-button">Buscar</button>
        </StyledSearchInput>
    )
}