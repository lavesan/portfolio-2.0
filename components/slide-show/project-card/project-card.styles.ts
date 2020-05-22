import styled, { css } from 'styled-components';

import { IStyledProjectCard } from './project-card.interfaces';

export const StyledProjectCard = styled.div<IStyledProjectCard>`
    ${({ imgUrl, selected, theme }) => css`
        width: 150px;
        height: 200px;
        background: url(${imgUrl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

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

        .project-name {
            color: ${theme.white.primary};
        }
    `}
`;
