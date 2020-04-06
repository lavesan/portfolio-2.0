import styled, { css } from 'styled-components';

export const StyledProductModal = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .deactivate-manage {
            pointer-events: none;
            opacity: .6;
        }
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
                    width: 30%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                    .quantity-label {
                        font-size: 1rem;
                        color: ${theme.gray.secondary};
                        margin: 5px 0;
                    }
                    .quantity-input {
                        border: 2px solid ${theme.gray.secondary};
                        color: ${theme.gray.secondary};
                        padding: 10px 10px;
                        border-radius: 5px;
                        box-sizing: border-box;
                        width: 100%;
                    }

                    .manage-quantity-container {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-evenly;
                        align-items: center;

                        > * {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            > * {
                                height: 30px;
                                border: thin solid ${theme.gray.primary};
                                color: ${theme.green.terciary};
                            }
                        }

                        .left {
                            border-right: none;
                        }

                        .right {
                            border-left: none;
                        }

                        button {
                            cursor: pointer;
                            outline: none;
                            background: none;
                        }

                        .quantity-text {
                            height: 28px;
                            user-select: none;
                            white-space: nowrap;
                            margin: 0;
                            padding: 0 8px;
                            display: flex;
                            align-items: center;
                        }
                    }
                }

                .value-container {
                    width: 30%;
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
