import React from 'react';

import { StyledCommentCard } from './comment-card.styles';
import emptyUser from '../../public/static/imgs/empty-user.png';

export default ({ user, briefComment }) => {
    return (
        <StyledCommentCard>
            <p className="comment-text">{briefComment}</p>
            <footer className="comment-card-footer">
                <div className="comment-card-footer--image-container">
                    <img src={user.imgUrl ? user.imgUrl : emptyUser} alt="ícone do usuário" />
                </div>
                <p>{user.name}, {user.age} anos</p>
            </footer>
        </StyledCommentCard>
    )
}
