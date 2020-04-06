import styled, { css } from 'styled-components';

export const StyledResponsiveNav = styled.div`
    ${({ theme, showResponsiveMenu }) => css`
        color: #fff;
        background-color: ${theme.green.primary};
        opacity: 0;
        transition: opacity .2s;
        position: fixed;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        top: 0;
        overflow-y: scroll;

        .exit-container {
            text-align: end;
            font-size: 1.7rem;
            margin: 30px 30px 50px 30px;
        }
        .nav-container, .loggin-container {
            text-align: center;
            display: flex;
            flex-flow: column nowrap;
            font-size: 1.3rem;

            p {
                margin: 0 0 20px 0;
                cursor: pointer;
            }

            a {
                text-decoration: none;
                color: #fff;
            }

            > * {
                margin-bottom: 20px;
            }
        }

        .loggin-container {
            margin-top: 70px;
        }

        .orders-link {
            padding: 20px 30px;
            background-color: #fff;
            border-radius: 5px;
            color: ${theme.green.terciary};
        }

        ${showResponsiveMenu && css`
            z-index: 4;
            opacity: 1;
        `}
    `}

`;
