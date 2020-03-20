import styled, { css } from 'styled-components';

export const StyledEntrarPage = styled.section`
    ${({ theme, isLoginForm }) => css`
        display: grid;
        grid-template-columns: ${isLoginForm ? '1fr 1fr' : '1fr'};
        min-height: 100vh;
        width: 100vw;
        color: ${theme.gray.secondary};

        > * {
            min-height: 0;
        }

        .authentication-form-section {
            padding: 50px ${isLoginForm ? '10' : '50'}px 20px 50px;
            display: flex;
            flex-flow: column nowrap;

            .authentication-header {
                display: grid;
                grid-template-columns: ${isLoginForm ? '1fr' : '1fr 1fr'};

                .authentication-header--title {
                    color: ${theme.green.terciary};
                    h1 {
                        font-size: 2.2rem;
                        margin: 0 0 3px 0;
                    }
                    p {
                        font-size: .9rem;
                        margin: 0;
                    }
                }

                .authentication-header--actions {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
            }

            .register-head-line {
                margin-top: 37px;
                height: 2px;
                background-color: ${theme.gray.primary};

                div {
                    animation
                }
            }

            .authentiication-footer {
                margin-top: auto;
                text-align: center;

                ${isLoginForm && 'max-width: 350px;'}

                p {
                    margin: 0;
                    font-size: .8rem;
                }
            }
        }
        
        .login-img-container img {
            min-width: 100%;
            max-height: 100%;
        }

        @keyframes
    `}
`;
