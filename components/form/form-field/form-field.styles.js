import styled, { css } from 'styled-components';

export const StyledFieldset = styled.div`
    ${({ theme, error, isTextArea, fieldHeight }) => css`
        color: ${theme.gray.secondary};
        display: flex;
        flex-flow: column nowrap;
        height: ${fieldHeight ? fieldHeight : (isTextArea ? '220' : '90')}px;
        position: relative;

        label {
            font-size: .9rem;
            margin-bottom: 10px;
        }

        .error-message {
            color: ${theme.danger.primary};
        }

        .optional-message {
            position: absolute;
            bottom: 4px;
            right: 4px;
            color: ${theme.gray.primary};
        }

        ${error && css`
            color: ${theme.danger.primary};
        `}
    `}
`;
