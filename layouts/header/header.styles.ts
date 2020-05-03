import styled, { css } from 'styled-components';

export const HeaderLayout = styled.header`
    ${({ theme }) => css`
        .nav-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
    
            .nav-header--header-link {
                padding: 5px 10px;
                text-decoration: none;
                color: ${theme.green.primary};
            }
        }
    `}
`;
