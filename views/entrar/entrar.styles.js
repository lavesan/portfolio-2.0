import styled, { css } from 'styled-components';

export const StyledEntrarPage = styled.section`
    ${({ theme, isLoginForm, loginImg }) => css`
        display: grid;
        grid-template-columns: ${isLoginForm ? '1fr 1fr' : '1fr'};
        min-height: 100vh;
        width: 100vw;
        color: ${theme.gray.secondary};

        > * {
            min-height: 0;
        }

        .responsive-icon-menu-container {
            margin: 10px 20px 0 0;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            height: 75px;

            .responsive-icon-menu-container--slot {
                display: flex;
                align-items: center;
                justify-content: center;
            }
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
                        font-size: .8rem;
                        margin: 0;
                    }
                }

                .authentication-header--actions {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .return-login-container {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    margin-bottom: 10px;
                    color: ${theme.gray.primary};
                    cursor: pointer;
                    font-size: 1rem;
                    a {
                        color: ${theme.gray.primary};
                        margin-left: 5px;
                        font-size: .8rem;
                        text-decoration: underline ${theme.gray.primary};
                    }
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
        }
        
        .login-img-container img {
            min-width: 100%;
            max-height: 100%;
        }

        @media(max-width: 699px) {
            background-image: url(${loginImg});
            background-repeat: no-repeat;
            background-size: auto 100%;
            grid-template-columns: 1fr;
            display: flex;
            flex-flow: column nowrap;

            .authentication-form-section {
                padding: 0 20px 20px 20px;
                flex: 1;
            }
            .authentication-form-section .authentication-header .return-login-container {
                display: none;
            }
        }
    `}
`;
