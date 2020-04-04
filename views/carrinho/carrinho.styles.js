import styled, { css } from 'styled-components';

export const StyledCarrinhoPage = styled.div`
    ${({ screenWidth, theme }) => css`
        display: flex;
        flex-flow: row nowrap;
        position: relative;

        .responsive-cart-container {
            margin: 30px 20px 20px 20px;

            .return-responsive-page {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin: 30px 0 20px 0;
                color: ${theme.gray.primary};
                cursor: pointer;
                font-size: 1rem;
                font-weight: bold;

                a {
                    color: ${theme.gray.primary};
                    margin-left: 5px;
                    text-decoration: none;
                    font-weight: normal;
                }
            }

            .cart-responsive-info {
                box-shadow: 0 0 6px -1px ${theme.gray.primary};
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                padding: 20px;

                h2 {
                    font-weight: 500;
                    margin: 0;
                    font-size: 1.4rem;
                }

                .product-info-row {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: space-between;
                    font-size: .8rem;
                    color: ${theme.green.terciary};
                    white-space: nowrap;

                    > * {
                        margin: 0;
                        text-align: end;
                    }

                    .total-price {
                        margin-top: auto;
                    }
                }
            }
        }

        .stepper-container {
            margin-right: 30px;
            width: 50%;

            > *:not(:last-child) {
                margin-bottom: 20px;
            }
        }

        .cart-container {
            position: sticky;
            top: 10px;
            right: 0;
            width: ${screenWidth / 2};
            height: 100%;
        }

        @media(max-width: 749px) {
            flex-direction: column;

            .stepper-container {
                width: 100%;
            }
        }
    `}
`;
