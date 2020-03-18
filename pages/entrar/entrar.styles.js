import styled, { css } from 'styled-components';

export const StyledEntrarPage = styled.section`
    ${({ theme, isLoginForm }) => css`
        display: grid;
        grid-template-columns: ${isLoginForm ? '1fr 1fr' : '1fr'};
        height: 100vh;
        width: 100vw;
        overflow: hidden;

        > * {
            min-height: 0;
        }

        .authentication-form-section {
            padding: 50px 10px 20px 50px;
            display: flex;
            flex-flow: column nowrap;

            .authentication-header {
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

            .register-head-line {
                margin-top: 37px;
                height: 2px;
                background-color: ${theme.gray.primary};
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
            max-height: 100%;
        }
    `}
`;
