import styled, { css } from 'styled-components';

export const StyledOrderCard = styled.div`
    ${({ theme }) => css`
        border: thin solid ${theme.gray.primary};
        color: ${theme.gray.secondary};
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-flow: column nowrap;
        box-sizing: border-box;

        > * {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }

        p {
            margin: 5px 0;
        }

        .labels {
            color: ${theme.green.terciary};
            font-weight: 700;
        }

        .last-container {
            margin-top: 13px;
        }

        .value-label {
            color: ${theme.green.terciary};
            margin-right: 20px;
            font-weight: 400;
        }

        .order-details-container {
            border-top: thin dotted ${theme.gray.primary};
            padding-top: 20px;
            margin-top: 20px;
            display: flex;
            flex-flow: column nowrap;

            > * {
                margin-bottom: 20px;
                width: 100%;
            }
            
            .text-field {
                height: 65px;
            }

            .row {
                display: flex;
                flex-flow: row nowrap;

                > :first-child {
                    width: 70%;
                }
                > :last-child {
                    margin-left: 20px;
                    width: 30%;
                }
            }

            .close-visualization-action {
                color: ${theme.gray.primary};
                background: none;
                text-align: center;
                border: none;
                font-size: 1rem;
            }

            .details-title {
                color: ${theme.gray.secondary};
                margin: 0 0 10px 0;
                font-size: 1.2rem;
            }

            .text-area-styled {
                height: 140px;
            }

            .whatsapp-title {
                color: ${theme.gray.secondary};
                font-size: 1.2rem;
                margin: 0;
            }

            .whatsapp-paragraph {
                color: ${theme.gray.secondary};
                font-size: .9rem;
                margin-top: 10px;
            }
            
            .go-to-whatsapp {
                color: #fff;
                background-color: ${theme.green.primary};
                border: thin solid ${theme.green.primary};
                cursor: pointer;
                border-radius: 5px;
                padding: 10px 20px;
                outline: none;
                text-decoration: none;
                width: 100%;
                display: block;
                text-align: center;
                box-sizing: border-box;
            }
        }
    `}
`;
