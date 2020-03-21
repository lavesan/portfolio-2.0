import styled, { css } from 'styled-components';

export const StyledResponsiveMenu = styled.aside`
    ${({ theme }) => css`
        display: flex;
        justify-content: flex-end;
        .responsive-icon-menu {
            color: #fff;
            background-color: ${theme.green.primary};
            border-radius: 5px;
            font-size: 1.5rem;
            padding: 10px 30px;
        }
    `}
`;
