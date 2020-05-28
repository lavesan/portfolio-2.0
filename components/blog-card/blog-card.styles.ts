import styled, { css } from 'styled-components';

import { IStyledBlogCard } from './blog-card.interfaces';

export const StyledBlogCard = styled.a<IStyledBlogCard>`
    ${({ theme, isResponsive }) => css`
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        text-decoration: none;

        .blog-img {
            width: 100px;
            margin-right: 20px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }

        .blog-title {
            color: ${theme.black.primary};
        }

        .blog-description {
            color: ${theme.black.primary};
        }

        ${isResponsive && css`
            flex-flow: column nowrap;

            .blog-img {
                width: 150px;
                margin: 0 auto;
            }
        `}
    `}
`;
