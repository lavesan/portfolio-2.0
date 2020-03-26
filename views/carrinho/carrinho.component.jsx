import React from 'react';
import { connect } from 'react-redux';

import { CartComponent } from '../../components/cart';
import { SaveOrderStepper } from './save-order-stepper';
import { StyledCarrinhoPage } from './carrinho.styles';

const CarrinhoPage = ({ screenWidth }) => {

    return (
        <StyledCarrinhoPage screenWidth={screenWidth}>
            <SaveOrderStepper className="stepper-container" />
            <CartComponent className="cart-container" />
        </StyledCarrinhoPage>
    )

}

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
});

export default connect(mapStateToProps)(CarrinhoPage);
