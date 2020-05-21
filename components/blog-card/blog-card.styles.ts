import styled from 'styled-components';

export const StyledBlogCard = styled.a`
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    
    * {
        text-decoration: none;
    }

    .blog-img {
        width: 200px;
        margin-right: 20px;
    }
`;
