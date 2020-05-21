import React from 'react';

import { StyledBlogCard } from './blog-card.styles';
import { IBlogCard } from './blog-card.interfaces';

export default ({ title, briefText, href, imgUrl }: IBlogCard) => {

    return (
        <StyledBlogCard
            href={href}
            target="_blank"
            rel="noopener noreferrer">
            <img
                src={imgUrl}
                alt={`Imagem do blog ${title}`}
                className="blog-img" />
            <div>
                <p><b>{title}</b></p>
                <p>{briefText}</p>
            </div>
        </StyledBlogCard>
    )

}
