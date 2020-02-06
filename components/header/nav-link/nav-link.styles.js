import styled, { css } from 'styled-components';

export const StyledNavLink = styled.a`
    ${({ theme }) => css`
        cursor: pointer;
        color: #fff;
        padding: 5px 10px;

        :hover {
            background-color: ${theme.green.primary};
        }
    `}
`;