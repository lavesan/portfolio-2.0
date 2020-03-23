import styled, { css } from 'styled-components';

export const StyledProductCart = styled.div`
    ${({ theme }) => css`
        display: grid;
        grid-template-columns: 2fr 2fr 1fr;
        grid-gap: 20px;
        color: ${theme.gray.secondary};
        border-bottom: thin solid ${theme.gray.primary};
        padding-bottom: 10px;

        > * {
            min-width: 0;
        }

        .image-container {
            .product-name {
                font-size: .9rem;
            }

            img {
                width: 80px;
            }
        }

        .quantity-container {
            display: flex;
            flex-flow: column nowrap;

            .quantity-title {
                color: ${theme.green.terciary};
                text-align: center;
            }

            .manage-quantity-container {
                display:  flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                margin: auto 0 10px 0;

                > * {
                    width: 27%;
                    margin: 0;
                    padding: 5px;
                    border-radius: 5px;
                    border: thin solid ${theme.gray.primary};
                    color: ${theme.gray.primary};
                    font-size: .9rem;
                    user-select: none;
                    background: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    outline: none;
                }
    
                > :not(.quantity-text) {
                    cursor: pointer;
                    font-size: 1.5rem;
                    padding: 0;
                }

                .quantity-text {
                    color: ${theme.green.terciary};
                    border-color: ${theme.green.primary};
                    white-space: nowrap;
                    font-weight: 900;
                }
                
                .deactivate-manage {
                    pointer-events: none;
                    opacity: .6;
                }
            }

            .quantity-input-container {
                margin: auto auto 10px auto;

                .quantity-input {
                    font-weight: 900;
                    outline: none;
                    color: ${theme.green.terciary};
                    border: thin solid ${theme.green.primary};
                    border-radius: 5px;
                    padding: 5px;
                    background: none;
                    text-align: center;
                    max-width: 90px;
                }
            }

            .value-text {
                font-size: 1.1rem;
                color: ${theme.green.terciary};
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                margin: 0;

                span {
                    margin-right: 8px;
                }
            }

        }

        .cart-action-container {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            p {
                margin: 5px 0 0 0;
            }

        }

    `}
`
