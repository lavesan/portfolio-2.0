import styled, { css } from 'styled-components';

export const StyledSocialLink = styled.div`
    ${({ theme }) => css`
        > :not(:last-child) {
            margin-bottom: 10px;
        }

        > * {
            display: inline-block;
            text-align: center;
            width: 20px;
            color: ${theme.green.primary};
        }

        > :active {
            color: ${theme.green.primary};
        }

        .nav-header--social-links-container--linkedin:hover {
            color: ${theme.brands.telegram};
        }

        .nav-header--social-links-container--github:hover {
            color: ${theme.brands.github};
        }
    `}
`;
