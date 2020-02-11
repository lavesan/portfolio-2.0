import React from 'react';

import { StyledCommentCard } from './comment-card.styles';

export default ({ userImgUrl, name, age, comment }) => {
    return (
        <StyledCommentCard>
            <p className="comment-text">{comment}</p>
            <footer className="comment-card-footer">
                <div className="comment-card-footer--image-container">
                    <img src={userImgUrl} alt="ícone do usuário" />
                </div>
                <p>{name}, {age} anos</p>
            </footer>
        </StyledCommentCard>
    )
}
