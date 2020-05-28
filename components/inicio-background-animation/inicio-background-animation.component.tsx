import React from 'react';

import { StyledLinesBackground, StyledInicioBackgroundAnimation } from './inicio-background-animation.styles';

export default () => {

    return (
        <StyledInicioBackgroundAnimation>
            <StyledLinesBackground seconds={3} top={-300} right={250} />
            <StyledLinesBackground seconds={4} top={-250} right={300} />
            <StyledLinesBackground seconds={2} top={-200} right={250} />
            <StyledLinesBackground seconds={6} top={-200} right={200} />
        </StyledInicioBackgroundAnimation>
    )

}
