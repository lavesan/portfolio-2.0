import React from 'react';

import { StyledBlogCard } from './blog-card.styles';
import { IBlogCard } from './blog-card.interfaces';
// @ts-ignore
import mediumLogo from '../../public/static/imgs/medium-logo.png';

export default ({ title, briefText, href, imgUrl }: IBlogCard) => {

    return (
        <StyledBlogCard
            href={href}
            target="_blank"
            rel="noopener noreferrer">
            <img
                src={imgUrl ? imgUrl : mediumLogo}
                alt={`Imagem do blog ${title}`}
                className="blog-img" />
            <div>
                <p className="blog-title"><b>{title}</b></p>
                <p className="blog-description">{briefText}</p>
            </div>
        </StyledBlogCard>
    )

}
