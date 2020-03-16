import styled, { css } from 'styled-components';

export const StyledLoginForm = styled.section`
    ${({ theme }) => css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-height: 500px;
        overflow: hidden;

        > * {
            min-height: 0;
        }

        .login-form-container {
            display: flex;
            flex-flow: column nowrap;
            padding: 20px 0 20px 20px;
            max-height: 470px;

            .login-header {
                color: ${theme.green.terciary};
                h2 {
                    font-size: 1.8rem;
                    margin: 0 0 3px 0;
                }
                p {
                    font-size: .9rem;
                    margin: 0;
                }
            }

            .login-form {
                max-width: 350px;
                .login-form-inputs-container {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: flex-start;
                    margin-top: 40px;

                    > * {
                        margin-bottom: 20px;
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

            .login-footer {
                margin-top: auto;
                text-align: center;
                max-width: 350px;
                p {
                    margin: 0;
                    font-size: .8rem;
                }
            }
        }

        .login-img-container img {
            max-width: 100%;
        }
    `}
`;
