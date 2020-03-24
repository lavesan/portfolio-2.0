import React from 'react';

import { CartComponent } from '../../components/cart';
import { SaveOrderStepper } from '../../components/save-order-stepper';
import { StyledCarrinhoPage } from './carrinho.styles';

export default () => {

    return (
        <StyledCarrinhoPage>
            <SaveOrderStepper className="stepper-container" />
            <CartComponent />
        </StyledCarrinhoPage>
    )

}
