import styled, { css } from 'styled-components';

export const StyledOrderModalComponent = styled.section`
    ${({ theme }) => css`
        .title-container {
            background-color: ${theme.green.terciary};
            color: #fff;
            font-size: 1.3rem;
            h2 {
                width: 100%;
                margin: 10px auto;
            }
        }

        h3 {
            color: ${theme.green.primary};
            font-size: 1.2rem;

        }

        .order-data {
            color: ${theme.gray.primary};
            font-size: 1.1rem;
            margin: 0 0 10px 0;
        }

        .value-container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            font-size: 1.2rem;

            .value-text {
                color: ${theme.gray.secondary};
            }

            div {
                flex: 1;
                background-color: ${theme.gray.secondary};
                height: 1px;
            }

            .value-total {
                color: ${theme.green.terciary};
            }
        }


        .confirm-row {
            display: flex;
            flex-flow: row nowrap;

            .total-value-container {
                display: flex;
                flex-flow: column nowrap;
                width: 60%;

                .value-text {
                    font-size: 1.2rem;
                    color: ${theme.gray.secondary};
                }

                .value-total-big {
                    font-size: 1.5rem;
                    color: ${theme.green.terciary};
                }
            }
        }
    `}
`;
