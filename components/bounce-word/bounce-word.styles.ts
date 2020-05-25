import styled, { keyframes, css } from 'styled-components';

import { IStyledBounceWord } from './bounce-word.interfaces';

const bounce = keyframes`
    0% {
        transform: scaleY(1) translate(0);
    }
    30% {
        transform: scaleY(0.7) scaleX(1.4) translateY(10px);
    }
    60% {
        transform: scaleY(1.2) translateY(3px);
    }
    100% {
        scale: 1;
        transform: scaleY(1) translate(0);
    }
`;

export const StyledBounceWord = styled.span<IStyledBounceWord>`
    ${({ activate }) => css`
        display: inline-block;
        user-select: none;

        ${activate && css`
            animation-name: ${bounce};
            animation-duration: .5s;
            animation-fill-mode: forwards;
        `}
    `}
`;
