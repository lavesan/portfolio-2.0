import styled, { css } from 'styled-components';

export const StyledCategoryResponsiveCard = styled.button`
    ${({ theme }) => css`
        border: thin solid ${theme.green.terciary};
        background-color: ${theme.green.terciary};
        border-radius: 5px;
        color: #fff;
        padding: 13px 5px;
        cursor: pointer;
        white-space: nowrap;
        outline: none;
    `}
`;
