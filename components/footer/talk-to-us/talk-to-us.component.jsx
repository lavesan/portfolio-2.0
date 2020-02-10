import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledTalkToUsParagraph } from './talk-to-us.styles';

export default ({ icon, value, title }) => {
    return (
        <StyledTalkToUsParagraph>
            <span title={title}>
                <FontAwesomeIcon icon={icon} />
            </span>
            {value}
        </StyledTalkToUsParagraph>
    )
}