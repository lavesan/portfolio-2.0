import styled, { css } from 'styled-components';

export const StyledOrderModalComponent = styled.section`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        font-weight: 600;

        .title-container {
            background-color: ${theme.green.terciary};
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            width: 100%;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            box-sizing: border-box;

            h2 {
                text-align: center;
                width: 100%;
                margin: 10px;
                font-size: 1.1rem;
            }
        }

        .modal-body {
            padding: 0 10px 10px 10px;

            .products-title {
                margin-top: 60px;
            }

            h3 {
                color: ${theme.green.primary};
                font-size: 1.1rem;

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
                font-size: 1rem;

                p {
                    margin: 0;
                }

                .value-text {
                    color: ${theme.gray.primary};
                }

                div {
                    flex: 1;
                    border: .5px dotted ${theme.gray.primary};
                    margin: auto 20px;
                }

                .value-total {
                    color: ${theme.green.terciary};
                }
            }


            .confirm-row {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                margin-top: 26px;

                .total-value-container {
                    display: flex;
                    flex-flow: column nowrap;
                    width: 60%;

                    .value-text {
                        font-size: .9rem;
                        color: ${theme.gray.primary};
                        margin: 0;
                    }

                    .value-total-big {
                        font-size: 1.4rem;
                        color: ${theme.green.terciary};
                        margin: 0;
                    }
                }
            }
        }

    `}
`;
