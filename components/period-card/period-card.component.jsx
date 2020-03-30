import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";

import { StyledPeriodCard } from './period-card.styles';
import { StyledRevSuccessButton, StyledSuccessButton } from '../button';
import { setSelectedPromotion } from '../../store/actions/productActions';

const PeriodCardComponent = ({ isPromotion, briefDescription, title, imgUrl, isBig, dispatch, ...promoProps }) => {

    const router = useRouter();

    const seePromotion = () => {

        dispatch(setSelectedPromotion({
            title,
            imgUrl,
            briefDescription,
            ...promoProps,
        }));
        router.push('/promocoes');

    }

    if (isPromotion) {
        return (
            <StyledPeriodCard imgUrl={imgUrl} isPromotion={isPromotion}>
                <h2 className="big-title">{title}</h2>
                <p className="promo-paragraph">{briefDescription}</p>
                <StyledRevSuccessButton onClick={seePromotion}>Quero garantir!</StyledRevSuccessButton>
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

export default connect()(PeriodCardComponent);
