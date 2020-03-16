import styled, { css } from 'styled-components';

export const StyledCategoryResponsiveCard = styled.div`
    ${({ theme }) => css`
        background-color: ${theme.green.terciary};
        border-radius: 5px;
        color: #fff;
        padding: 10px 5px;
        cursor: pointer;
    `}
`;
