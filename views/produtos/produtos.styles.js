import styled, { css } from 'styled-components';

export const StyledProdutosPage = styled.section`
    ${({ theme }) => css`
        .not-found-row {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 70px;

            h2 {
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
    `}
`;
