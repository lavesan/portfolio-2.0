import styled, { css } from 'styled-components';

import { IStyledContactCard } from './contact-card.interfaces';

export const StyledContactCard = styled.a<IStyledContactCard>`
    ${({ theme, backgroundColor }) => css`
        text-decoration: none;
        outline: none;
        box-sizing: border-box;
        color: ${theme.green.primary};
        border: thin solid ${theme.green.primary};
        border-radius: 5px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: 20px;
        transition: .3s;

        :hover {
            background-color: ${backgroundColor};
            color: ${theme.white.primary};
            border-color: ${backgroundColor};
        }

        .icon {
            font-size: 2.5rem;
        }
        .text {
            font-size: 1.1rem;
            margin: 20px 0 0 0;
        }

        :hover {
            .text {
                text-decoration: underline;
                text-decoration-color: ${theme.white.primary};
            }
        }
    `}
`;
