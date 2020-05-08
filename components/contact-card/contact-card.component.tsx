import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledContactCard } from './contact-card.styles';
import { IContactCard } from './contact-card.interfaces';

export default ({ href, icon, text, backgroundColor }: IContactCard) => {

    return (
        <StyledContactCard
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            backgroundColor={backgroundColor}>
            <FontAwesomeIcon className="icon" icon={icon} />
            <p className="text">{text}</p>
        </StyledContactCard>
    )

}
