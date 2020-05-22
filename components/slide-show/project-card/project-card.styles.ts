import styled, { css, keyframes } from 'styled-components';

import { IStyledProjectCard } from './project-card.interfaces';

const scaleChange = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`;

const scaleHide = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0);
        width: 150px;
    }
    100% {
        width: 0;
    }
`;

export const StyledProjectCard = styled.div<IStyledProjectCard>`
    ${({ imgUrl, selected, disappear, theme }) => css`
        width: 150px;
        height: 200px;
        background: url(${imgUrl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        animation-name: ${disappear ? scaleHide : scaleChange};
        animation-duration: .3s;
        animation-fill-mode: forwards;
        /* ${disappear ? 'backwards' : 'forwards'} */

        .project-brief-info {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: ${theme.gray.secondary};
            opacity: 0;
            transition: .5s;
            height: 100%;

            > * {
                display: none;
            }
        }
        .selected-project {
            opacity: .7;

            > * {
                display: flex;
            }
        }

        :hover {
            .project-brief-info {
                opacity: .7;

                > * {
                    display: flex;
                }
            }
        }

        ${selected && css`
            .project-brief-info {
                opacity: .7;

                > * {
                    display: flex;
                }
            }
        `}

        .project-name {
            color: ${theme.white.primary};
        }
    `}
`;
