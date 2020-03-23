import styled, { css } from 'styled-components';

export const StyledLoginForm = styled.section`
    ${({ theme }) => css`
        display: flex;
        flex-flow: column nowrap;
        flex: 1;

        .login-form {
            max-width: 350px;
            margin-top: 20px;
            display: flex;
            flex-flow: column nowrap;
            flex: 1;
            .login-form-inputs-container {
                display: flex;
                flex-flow: column nowrap;
                justify-content: flex-start;
                margin-top: 40px;

                > * {
                    margin-bottom: 30px;
                }
            }

            .login-form-buttons-container {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;

                > * {
                    margin-bottom: 20px;
                }

                .submit-button {
                    width: 150px;
                }
            }

            .authentication-footer-description {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: flex-end;
            }

            .register-link-container {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .9rem;

                > * {
                    margin: 0;
                }

                p {
                    margin-right: 5px;
                }

                a {
                    color: ${theme.green.primary};
                    text-decoration-color: ${theme.green.primary};
                }
            }
        }
        
        @media(max-width: 699px) {
            .login-form {
                max-width: 100%;

                .authentication-footer-description {
                    display: none;
                    flex: 0;
                }

                .login-form-buttons-container {
                    flex: 1;
                }

                .login-form-buttons-container .submit-button {
                    margin-top: 30px;
                    width: 70%;
                }

                .register-link-container {
                    flex: 1;
                    align-items: flex-end;
                    color: ${theme.green.terciary};

                    a {
                        font-weight: bolder;
                        color: ${theme.green.terciary};
                        text-decoration-color: ${theme.green.terciary};
                    }
                }
            }
        }
    `}
`;
