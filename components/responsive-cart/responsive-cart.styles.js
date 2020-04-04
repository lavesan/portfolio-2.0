import styled, { css } from 'styled-components';

export const StyledResponsiveCard = styled.div`
    ${({ theme, openResponsiveCart, screenHeight, openCartHeader }) => css`
        position: fixed;
        transition: top .3s;
        top: ${screenHeight + 50}px;
        width: 100vw;
        z-index: 3;
        background-color: #fff;
        height: ${screenHeight - 100}px;
        display: flex;
        flex-flow: column nowrap;

        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-flow: row nowrap;
            padding: 20px 32px;
            font-size: 1rem;
            color: #fff;
            background-color: ${theme.green.primary};
            color: ${theme.green.terciary};

            .icon-container {
                position: relative;

                .notify {
                    position: absolute;
                    top: -8px;
                    left: 18px;
                    color: #fff;
                    background-color: ${theme.green.hexaternary};
                    color: ${theme.green.terciary};
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
            flex: 1;

            .cart-title-container {
                padding-top: 10px;
                p {
                    margin: 0;
                    cursor: pointer;
                    font-size: .8rem;
                    text-align: end;
                    color: ${theme.green.terciary};
                }

                .danger-text {
                    color: ${theme.danger.primary};
                }
            }

            .products-container {
                overflow-y: scroll;
                height: ${screenHeight - 320}px;
            }
            
            .responsive-cart {
                margin-top: 20px;
            }
        }
        
        .complete-container {

            .success-button {
                width: 100%;
                border-radius: 0;
                text-align: center;
                padding: 20px 0;
                font-size: 1rem;
            }

            .total-text {
                font-size: 1.4rem;
                color: ${theme.green.terciary};
                margin: 20px 0;
                text-align: center;
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
