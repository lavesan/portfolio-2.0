import styled, { css } from 'styled-components';

export const StyledPromocoesPage = styled.section`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};

        .title-section {
            h1 {
                font-size: 2rem;
                color: ${theme.green.terciary};
                font-family: BobbyJonesSoft, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin: 10px 0 0 0;
            }
            p {
                font-size: .9rem;
                margin: 0 0 10px 0;
            }
        }

        .products-grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
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
        }
    `}
`;
