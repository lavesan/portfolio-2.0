import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledAsideIcon } from './aside-icon.styles';

export default ({ icon, text, ...elemAttrs }) => {
    return (
        <StyledAsideIcon {...elemAttrs}>
            <FontAwesomeIcon icon={icon} className="header-action-icon" />
            <p className="header-action-text">{text}</p>
        </StyledAsideIcon>
    )
}