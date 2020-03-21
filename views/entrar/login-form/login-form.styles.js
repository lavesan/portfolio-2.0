import styled, { css } from 'styled-components';

export const StyledLoginForm = styled.form`
    ${({ theme }) => css`
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
    `}
`;
