import styled, { css } from 'styled-components';

export const StyledProductCart = styled.div`
    ${({ theme, deactivateQuantitySubtract }) => css`
        display: grid;
        grid-template-columns: 2fr 2fr 1fr;
        grid-gap: 20px;
        color: ${theme.gray.secondary};

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

            .quantity-text {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                align-items: center;

                .quanity-number {
                    color: #fff;
                    padding: 3px;
                    margin-left: 5px;
                    background-color: ${theme.green.terciary};
                }
            }

            .manage-quantity-container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;

                ${deactivateQuantitySubtract && css`
                    .minus {
                        pointer-events: none;
                        opacity: .6;
                    }
                `}

                button {
                    cursor: pointer;
                    background: none;
                    border: thin solid ${theme.gray.primary};
                    padding: 7px;
                    width: 60px;
                    outline: none;
                    user-select: none;
                }
            }

            .value-text {
                font-size: 1.1rem;
                color: ${theme.green.terciary};
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
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
