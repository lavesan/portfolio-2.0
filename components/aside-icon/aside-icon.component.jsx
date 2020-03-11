import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledAsideIcon } from './aside-icon.styles';
import { StyledIconNotification } from '../icon-notifications/icon-notifications.styles';

export default ({ icon, text, notificationQuantity, ...elemAttrs }) => {
    return (
        <StyledAsideIcon {...elemAttrs}>
            {notificationQuantity ? <StyledIconNotification style={{ left: 15, top: 12 }}>{notificationQuantity}</StyledIconNotification> : ''}
            <FontAwesomeIcon icon={icon} className="header-action-icon" />
            <p className="header-action-text">{text}</p>
        </StyledAsideIcon>
    )
}