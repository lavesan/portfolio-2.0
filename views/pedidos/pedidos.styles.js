import styled, { css } from 'styled-components';

export const StyledPedidosPage = styled.section`
    ${({ theme }) => css`
        .title {
            color: ${theme.gray.secondary};
            margin: 10px 0 30px 0;
        }

        .comment-title {
            color: ${theme.gray.secondary};
            margin-bottom: 0;
        }

        .comment-legend {
            margin: 5px 0;
            color: ${theme.gray.secondary};
        }

        .orders-container {
            display: flex;
            flex-flow: row wrap;

            > *:not(:last-child) {
                margin-right: 20px;
            }
        }

        .comment-button {
            display: flex;
            justify-content: flex-end;

            button {
                width: 130px;
            }
        }

        .comment-texarea {
            height: 130px;
        }

        .no-order-text {
            color: ${theme.gray.secondary};
            font-size: 1rem;
        }

        @media(max-width: 750px) {
            .orders-container {
                flex-direction: column;

                > * {
                    width: 100%;
                }

                > *:not(:last-child) {
                    margin: 0 0 20px 0;
                }
            }
        }
    `}
`
