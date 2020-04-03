import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { CartComponent } from '../../components/cart';
import { SaveOrderStepper } from './save-order-stepper';
import { StyledCarrinhoPage } from './carrinho.styles';

const CarrinhoPage = ({ screenWidth }) => {

    const isResponsive = useMemo(
        () => {
            return screenWidth < 750;
        },
        [screenWidth]
    )

    return (
        <StyledCarrinhoPage screenWidth={screenWidth} isResponsive={isResponsive}>
            <SaveOrderStepper isResponsive={isResponsive} className="stepper-container" />
            {!isResponsive &&
                <CartComponent className="cart-container" />
            }
        </StyledCarrinhoPage>
    )

}

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
});

export default connect(mapStateToProps)(CarrinhoPage);
