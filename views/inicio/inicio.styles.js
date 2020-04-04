import styled, { css, keyframes } from 'styled-components';

const horizontalSlide = keyframes`
    from {
        transform: translate(-10px);
    }

    to {
        transform: translate(2000px);
    }
`;

export const StyledStartPage = styled.div`
    ${({ theme }) => css`
        .promo-combos-section {
            width: 100%;
            .promos-section {
                width: 100%;
                margin-bottom: 20px;

                .loading-promotion {
                    border-radius: 5px;
                    height: 220px;
                    background-color: ${theme.gray.secondary};
                    overflow: hidden;
                    display: flex;
                    flex-flow: row nowrap;
                    div {
                        background-color: ${theme.gray.primary};
                        height: 100%;
                        animation: ${horizontalSlide} 1.5s linear infinite;
                    }
                    .load-1 {
                        width: 10px;
                        animation-duration: 1s;
                    }
                    .load-2 {
                        width: 5px;
                        animation-duration: 1.5s;
                    }
                    .load-3 {
                        width: 2px;
                        animation-duration: 2s;
                    }
                }
            }
            .combos-section {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 20px;

                > * {
                    min-width: 0;
                }
            }
        }

        .categories-section {

            h2 {
                font-size: 1rem;
                color: ${theme.green.terciary};
            }

            .categories-row {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin-top: 20px;
                overflow-x: scroll;

                > * {
                    margin-right: 10px;
                }
            }

        }

        .product-section {
            display: flex;
            flex-flow: column nowrap;
            > * {
                margin-top: 20px;
            }
            .products-container {
                > * {
                    padding-right: 20px;
                    width: 200px;
                }
            }
        }

        .responsive-products-container {
            
            h2 {
                font-size: 1rem;
                color: ${theme.green.terciary};
            }
            
            .products-container {
                margin-top: 20px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 20px;
            }
        }
        
        @media(max-width: 550px) {
            .responsive-products-container .products-container {
                grid-template-columns: 1fr 1fr;
            }
        }
    `}
`;
