import styled, { css } from 'styled-components';

export const StyledSucessButton = styled.button`
    ${({ theme }) => css`
        outline: none;
        background-color: ${theme.white.primary};
        cursor: pointer;
        border: thin solid ${theme.gray.secondary};
        color: ${theme.gray.secondary};
        padding: 10px 20px;
    `}
`;
