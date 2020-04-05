import styled, { css } from 'styled-components';

export const StyledProductOrderCard = styled.p`
    ${({ theme }) => css`
        padding: 10px 20px;
        background-color: ${theme.gray.terciary};
        color: ${theme.gray.secondary};
        border-radius: 5px;
    `}
`
