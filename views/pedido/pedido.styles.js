import styled, { css } from 'styled-components';

export const StyledPedidoView = styled.section`
    ${({ theme }) => css`
        .principal-title {
            margin: 10px 0 20px 0;
            color: ${theme.gray.secondary};
        }

        p {
            margin: 0;
        }
        
        .principal-paragraph {
            color: ${theme.gray.secondary};
            margin-bottom: 15px;   
        }

        .product-value-container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-bottom: 20px;

            .products-flexbox {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: space-between;
                width: 60%;

                > * {
                    width: 20%;
                    margin: 0 10px 20px 0;
                }
            }

            .divisor {
                width: 2px;
                background-color: ${theme.gray.secondary};
                height: 105px;
                margin: 0 20px 0 10px;
            }

            .value-box {
                width: 20%;

                .status-label {
                    color: ${theme.green.primary};
                }
        
                .total-value {
                    color: #fff;
                    background-color: ${theme.green.terciary};
                    border-radius: 5px;
                    padding: 5px 15px;
                    margin: 20px 0 0 0;
                    text-align: center;
                }
            }
        }

        .personal-info-container {
            border-top: thin dotted ${theme.gray.primary};
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;

            > *:not(:last-child) {
                margin-right: 20px;
                width: 30%;
            }

            .section-title {
                color: ${theme.gray.secondary};
                font-size: 1.4rem;
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

            .contact-title {
                color: ${theme.gray.secondary};
                font-size: 1.3rem;
                font-weight: 500;
            }

            .contact-paragraph {
                color: ${theme.gray.secondary};
                font-size: .9rem;
            }

            .disabled-textarea {
                height: 140px; 
            }

            .link-container {
                margin-top: 35px;
                width: 100%;

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
                }
            }
        }
    `}
`;
