import styled, { css } from 'styled-components';

export const StyledHeader = styled.header`
    ${({ theme }) => css`
        background-color: ${theme.green.primary};
    `}
`;