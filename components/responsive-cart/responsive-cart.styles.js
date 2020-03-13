import styled, { css } from 'styled-components';

export const StyledResponsiveCard = styled.div`
    ${({ theme, openResponsiveCart, screenHeight, openCartHeader }) => css`
        background-color: ${theme.green.primary};
        position: fixed;
        transition: top .3s;
        top: ${screenHeight}px;
        width: 100vw;
        height: 100vh;

        .cart-header {
            display: flex;
            justify-content: space-between;
            flex-flow: row nowrap;
            padding: 20px 32px;
            font-size: 1rem;
            color: ${theme.green.terciary};

            .icon-container {
                position: relative;

                .notify {
                    position: absolute;
                    top: -8px;
                    left: 18px;
                    color: ${theme.green.terciary};
                    background-color: #fff;
                }

                .icon {
                    font-size: 1.2rem;
                }
            }
        }

        .cart-container {
            z-index: -1;
        }

        ${openCartHeader && css`
            top: ${screenHeight - 60}px;
        `}

        ${openResponsiveCart && css`
            z-index: 2;
            top: 100px;
        `}

    `}
`;
