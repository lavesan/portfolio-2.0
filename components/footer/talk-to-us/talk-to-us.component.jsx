import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledTalkToUsParagraph } from './talk-to-us.styles';

export default ({ icon, value, title, href, ...props }) => {
    return (
        <StyledTalkToUsParagraph href={href} target="_blank" rel="noopener noreferrer" {...props}>
            <span title={title}>
                <FontAwesomeIcon icon={icon} />
            </span>
            {value}
        </StyledTalkToUsParagraph>
    )
}