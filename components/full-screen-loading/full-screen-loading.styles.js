import styled, { css } from 'styled-components';

export const StyledFullScreenLoading = styled.div`
    ${({ theme, show }) => css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        background-color: ${theme.green.terciary};

        .loading-animated {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 1rem;
            flex-flow: column wrap;

            > :last-child {
                margin-top: 20px;
            }
        }

        ${!show && css`
            z-index: -2;
            display: none;
        `}
    `}
`;
