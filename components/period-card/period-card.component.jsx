import React, { memo } from 'react';

import { StyledPeriodCard } from './period-card.styles';
import { StyledRevSuccessButton, StyledSuccessButton } from '../button';

const PeriodCardComponent = ({ isPromotion, briefDescription, title, imgUrl, isBig }) => {

    const garanteePromotion = () => {

    }

    const seePromotion = () => {

    }

    if (isPromotion) {
        return (
            <StyledPeriodCard imgUrl={imgUrl} isPromotion={isPromotion}>
                <h2 className="big-title">{title}</h2>
                <p className="promo-paragraph">{briefDescription}</p>
                <StyledRevSuccessButton onClick={garanteePromotion}>Quero garantir!</StyledRevSuccessButton>
            </StyledPeriodCard>
        )
    } else {
        return (
            <StyledPeriodCard className={isBig ? '' : 'combo-card'} imgUrl={imgUrl} isPromotion={isPromotion || isBig}>
                <p>{briefDescription}</p>
                <h2 className={isBig ? 'big-title' : 'promo-title'}>{title}</h2>
                <StyledSuccessButton className={isBig ? '' : 'combo-button'} onClick={seePromotion}>Conferir</StyledSuccessButton>
            </StyledPeriodCard>
        )
    }
}

export default memo(PeriodCardComponent);
