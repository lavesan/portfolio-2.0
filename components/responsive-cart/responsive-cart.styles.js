import styled, { css } from 'styled-components';

export const StyledResponsiveCard = styled.div`
    ${({ theme, openResponsiveCart, screenHeight, openCartHeader }) => css`
        background-color: ${theme.green.terciary};
        position: fixed;
        transition: top .3s;
        top: ${screenHeight}px;
        width: 100vw;
        height: 100vh;
        z-index: 2;

        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-flow: row nowrap;
            padding: 20px 32px;
            font-size: 1rem;
            color: #fff;

            .icon-container {
                position: relative;

                .notify {
                    position: absolute;
                    top: -8px;
                    left: 18px;
                    color: #fff;
                    background-color: ${theme.green.quaternary};
                }

                .icon {
                    font-size: 1.2rem;
                }
            }
            p {
                margin: 0;
            }
        }

        .cart-container {
            padding: 0 20px;
            color: #fff;

            .cart-title-container {
                
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;

                h2 {
                    margin: 0;
                    font-size: 1.1rem;
                }
                p {
                    margin: 0;
                    cursor: pointer;
                    font-size: .8rem;
                }
            }
            
            .responsive-cart {
                margin-top: 20px;
            }
        }

        ${openCartHeader && css`
            top: ${screenHeight - 60}px;
        `}

        ${openResponsiveCart && css`
            top: 100px;
        `}

    `}
`;
