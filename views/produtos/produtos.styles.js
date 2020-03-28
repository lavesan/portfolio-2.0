import styled, { css } from 'styled-components';

export const StyledProdutosPage = styled.section`
    ${({ theme }) => css`
        .product-filter-container {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;

            .result-title {
                color: ${theme.green.terciary};
                font-size: 1.4rem;
                margin: 0;
            }
            .result-paragraph {
                color: ${theme.gray.secondary};
                font-size: .8rem;
                margin: 3px 0;
            }

            .filter-container {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                color: ${theme.gray.primary};

                > * {
                    margin: 0;
                }

                > :not(:last-child) {
                    margin-right: 10px;
                }

                .filter-button {
                    position: relative;
                    border: thin solid ${theme.gray.primary};
                    padding: 10px 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    margin-right: 10px;
                    outline: none;
                    
                    .delete-icon {
                        position: absolute;
                        top: 11px;
                        right: 8px;
                        display: none;
                        color: ${theme.danger.primary};
                    }
                    :hover {
                        .delete-icon {
                            display: inline-block;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .products-grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
        }
        .not-found-row {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 70px;

            h1 {
                font-size: 1.4rem;
                color: ${theme.green.terciary};
                margin: 10px 0;
            }

            p {
                color: ${theme.gray.secondary};
                margin: 0 0 10px 0;
                font-size: .8rem;
            }

            img {
                width: 100%;
                max-width: 400px;
            }
        }

        @media(max-width: 1150px) {
            .products-grid-container {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
        }
        @media(max-width: 900px) {
            .products-grid-container {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
        @media(max-width: 700px) {
            .products-grid-container {
                grid-template-columns: 1fr 1fr;
            }
            
            .product-filter-container .filter-container .filter-button .delete-icon {
                display: inline-block;
                cursor: pointer;
            }
        }

        @media(max-width: 700px) {
            .product-filter-container {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;

                > * {
                    margin-bottom: 20px;
                }
            }
        }
    `}
`;
