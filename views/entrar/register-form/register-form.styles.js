import styled, { css } from 'styled-components';

export const StyledRegisterForm = styled.form`
    ${({ theme }) => css`
        color: ${theme.gray.secondary};
        display: flex;
        flex-flow: column nowrap;
        flex: 1;

        .form-row {
            display: flex;
            flex-flow: row nowrap;
            margin-top: 30px;

            > * {
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-start;

                > * {
                    width: 100%;
                }

            }
            > :not(.address-form) {
                padding-right: 40px;
            }

            .credentials-form {
                width: 25%;
            }

            .info-form {
                width: 37%;
            }

            .address-form {
                width: 38%;
            }
        }
        .button-row {
            margin-top: auto;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;

            > * {
                min-width: 0;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
            .footer-container {
                justify-content: center;
            }
            .button-container {
                justify-content: flex-end;
            }
        }
    `}
`;

export const StyledFormTitle = styled.div`
    ${({ theme }) => css`
        height: 70px;
        h2 {
            margin: 0;
            font-size: 1.3rem;
            color: ${theme.green.terciary};
        }
        
        .section-description {
            margin: 0;
            font-size: .8rem;
            color: ${theme.gray.secondary};
        }
    `}
`;
