import styled, { css } from 'styled-components';

export const StyledProductModal = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .product-image-container {
            width: 33%;

            img {
                width: 250px;
                max-width: 100%;
            }
        }

        .product-no-stock {
            font-weight: 700;
            color: ${theme.danger.primary};
        }

        .product-info {
            width: 66%;
            padding-left: 25px;

            .product-info-description {
                border-bottom: thin solid ${theme.gray.primary};

                .status-text {
                    font-size: .9rem;
                    margin-top: 0;
                    color: ${theme.green.terciary};
                    font-weight: 700;
                }
            }

            .product-info--actions {
                display: flex;
                flex-flow: row nowrap;
                margin-top: 10px; 

                > * {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .quantity-container {
                    width: 20%;
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
                            outline: none;
                        }
                        .quantity-value {
                            color: ${theme.gray.secondary};
                            cursor: default;
                        }
                    }
                }

                .value-container {
                    width: 40%;
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

                .button-container {
                    width: 40%;
                }
            }
        }

        @media(max-width: 650px) {
            flex-direction: column;

            .product-image-container {
                display: flex;
                justify-content: center;
                margin-top: 22px;
                width: 100%;

                img {
                    width: 200px;
                }
            }

            .product-info {
                width: 100%;
                padding-left: 0;

                .product-info--actions {
                    flex-flow: row wrap;

                    .quantity-container {
                        width: 50%;
                    }

                    .value-container {
                        width: 50%;
                    }

                    .button-container {
                        margin-top: 20px;
                        width: 100%;
                    }
                }
            }
        }
    `}
`;
