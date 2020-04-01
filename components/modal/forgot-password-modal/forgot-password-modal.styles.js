import styled, { css } from 'styled-components';

export const StyledForgotPasswordModal = styled.form`
    ${({ theme }) => css`
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: 23px 20px 20px 20px;
        max-width: 415px;

        h2 {
            color: ${theme.green.terciary};
            font-size: 1.8rem;
            margin: 20px 0;
        }

        .forgot-description {
            font-size: 1rem;
            color: ${theme.gray.secondary};
            text-align: center;
            margin: 0 0 20px 0;
        }

        .forgot-password-button {
            margin-bottom: 20px;
        }
    `}
`;
