import styled, { css } from 'styled-components';

export const StyledNavLink = styled.a`
    ${({ theme }) => css`
        cursor: pointer;
        color: #fff;
        padding: 5px 10px;

        &.active-route {
            background-color: ${theme.green.terciary};
        }
        :hover {
            background-color: ${theme.green.terciary};
        }
    `}
`;