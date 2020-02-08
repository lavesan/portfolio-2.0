import React from 'react';

import { StyledPeriodCard } from './period-card.styles';
import { StyledRevSuccessButton, StyledSuccessButton } from '../button';

export default ({ isPromotion, briefDescription, title, imgUrl }) => {

    const garanteePromotion = () => {

    }

    const seePromotion = () => {

    }

    if (isPromotion) {
        return (
            <StyledPeriodCard imgUrl={imgUrl} isPromotion={isPromotion}>
                <h2 className="big-title">{title}</h2>
                <p>{briefDescription}</p>
                <StyledRevSuccessButton onClick={garanteePromotion}>Quero garantir!</StyledRevSuccessButton>
            </StyledPeriodCard>
        )
    } else {
        return (
            <StyledPeriodCard className="combo-card" imgUrl={imgUrl} isPromotion={isPromotion}>
                <p>{briefDescription}</p>
                <h2 className="promo-title">{title}</h2>
                <StyledSuccessButton className="combo-button" onClick={seePromotion}>Conferir</StyledSuccessButton>
            </StyledPeriodCard>
        )
    }
}