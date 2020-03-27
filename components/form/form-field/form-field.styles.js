import styled, { css } from 'styled-components';

export const StyledFieldset = styled.div`
    ${({ theme, error, isTextArea }) => css`
        color: ${theme.gray.secondary};
        display: flex;
        flex-flow: column nowrap;
        height: ${isTextArea ? '220' : '90'}px;

        label {
            font-size: .9rem;
            margin-bottom: 10px;
        }

        .error-message {
            color: ${theme.danger.primary};
        }

        ${error && css`
            color: ${theme.danger.primary};
        `}
    `}
`;
