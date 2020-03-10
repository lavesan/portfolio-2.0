import styled, { css } from 'styled-components';

export const StyledProductModal = styled.div`
    ${({ theme }) => css`
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 20px;

        .product-image-container img {
            width: 250px;
        }

        .product-no-stock {
            font-weight: 700;
            color: ${theme.danger.primary};
        }

        .product-info {
            display: grid;
            grid-template-rows: 2fr 1fr;
            grid-gap: 10px;

            .product-info-description {
                border-bottom: thin solid ${theme.gray.primary};

                .status-text {
                    font-size: .9rem;
                    margin-top: 0;
                }
            }

            .product-info--actions {
                display: grid;
                grid-template-columns: 1fr 2fr 2fr;
                grid-gap: 10px;

                > * {
                    min-width: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .quantity-container {
                    .quantity-input {
                        border: thin solid ${theme.gray.primary};
                        border-radius: 5px;
                        padding: 10px 5px;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        color: ${theme.gray.primary};
                        width: 70px;
                        height: 9px;

                        .disabled {
                            opacity: .7;
                            pointer-events: none;
                        }

                        p {
                            cursor: pointer;
                            user-select: none;
                        }
                        .quantity-value {
                            color: ${theme.gray.secondary};
                            cursor: default;
                        }
                    }
                }

                .value-container {
                    display: flex;
                    flex-flow: column nowrap;

                    p {
                        margin: 0;
                        color: ${theme.gray.secondary};
                    }
                    .total-value {
                        font-size: 1.4rem;
                        color: ${theme.green.secondary};
                    }
                }
            }
        }
    `}
`;
