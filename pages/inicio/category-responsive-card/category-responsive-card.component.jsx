import React from 'react';

import { StyledCategoryResponsiveCard } from './category-responsive-card.styles';

export default ({ name, onClick }) => {
    return (
        <StyledCategoryResponsiveCard onClick={onClick}>
            {name}
        </StyledCategoryResponsiveCard>
    )
}
