import styled, { css } from 'styled-components';

export const StyledLoginForm = styled.form`
    ${({ theme }) => css`
        max-width: 350px;
        margin-top: 50px;
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
