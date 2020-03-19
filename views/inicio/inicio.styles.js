import styled, { css } from 'styled-components';

export const StyledStartPage = styled.div`

    .promo-combos-section {
        width: 100%;
        .promos-section {
            width: 100%;
            margin-bottom: 20px;
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
            font-size: 1.2rem;
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
            /* display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 20px; */
    
            > * {
                padding-right: 20px;
            }
        }
    }
`;
