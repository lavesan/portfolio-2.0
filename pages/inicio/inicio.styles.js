import styled from 'styled-components';

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

    .product-section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 20px;

        > * {
            min-width: 0;
            min-height: 0;
        }
    }
`;
