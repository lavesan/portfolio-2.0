import React from 'react';
import noImage from '../../public/static/imgs/produto-sem-imagem.png';

import { StyledNoImageProduct } from './no-image-product.styles';

export default (props) => {

    return (
        <StyledNoImageProduct {...props}>
            <img src={noImage} />
            <p>Sem foto por enquanto...</p>
        </StyledNoImageProduct>
    )

}
