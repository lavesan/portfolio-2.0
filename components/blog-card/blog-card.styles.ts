import styled, { css } from 'styled-components';

export const StyledBlogCard = styled.a`
    ${({ theme }) => css`
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        text-decoration: none;

        .blog-img {
            width: 100px;
            margin-right: 20px;
        }

        .blog-title {
            color: ${theme.black.primary};
        }

        .blog-description {
            color: ${theme.black.primary};
        }
    `}
`;
