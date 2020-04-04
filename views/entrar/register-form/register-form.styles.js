import styled, { css } from 'styled-components';

export const StyledRegisterForm = styled.section`
    ${({ theme }) => css`
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        scroll-behavior: smooth;

        .register-header {
            grid-template-columns: 1fr 1fr;
            margin-top: 27px;
        }
        .register-head-line {
            margin-top: 37px;
            height: 2px;
            background-color: ${theme.gray.primary};
        }
        .form-container {
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
                > .credentials-form, .info-form {
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

                .full-width {
                    width: 100%;
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
                    width: 150px;
                }
            }

            .step-button-row {
                margin-top: auto;
                margin-bottom: 30px;
            }
        }

        .return-login-container {
            position: absolute;
            top: 55px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-bottom: 10px;
            color: ${theme.gray.primary};
            cursor: pointer;
            font-size: 1rem;
            outline: none;

            a {
                color: ${theme.gray.primary};
                margin-left: 5px;
                font-size: .8rem;
                text-decoration: underline ${theme.gray.primary};
                outline: none;
            }
        }

        @media(max-width: 699px) {
            .register-header {
                grid-template-columns: 1fr;
                margin-top: 0;

                .authentication-header--actions {
                    display: none;
                }
            }
        }
    `}
`;

export const StyledFormTitle = styled.div`
    ${({ theme, isResponsive }) => css`
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

        ${isResponsive && css`
            height: 90px;
        `}
    `}
`;
