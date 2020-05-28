import styled, { css, keyframes } from 'styled-components';

import { IStyledLinesBackground } from './inicio-background-animation.interfaces';

const moveLine = keyframes`
    0% {
        transform: translate(10px, 10px) rotate(45deg);
    }
    50% {
        transform: translate(200px, 200px) rotate(45deg);
    }
    100% {
        transform: translate(10px, 10px) rotate(45deg);
    }
`;

export const StyledInicioBackgroundAnimation = styled.div`
    ${({ theme }) => css`
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
    `}
`;

export const StyledLinesBackground = styled.div<IStyledLinesBackground>`
    ${({ seconds, theme, top, right }) => css`
        position: absolute;
        top: ${top}px;
        right: ${right}px;
        width: 2px;
        height: 70vh;
        background-color: ${theme.white.primary};
        animation-name: ${moveLine};
        animation-duration: ${seconds}s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
    `}
`;
