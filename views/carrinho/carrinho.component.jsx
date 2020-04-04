import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import { CartComponent } from '../../components/cart';
import { SaveOrderStepper } from './save-order-stepper';
import { StyledCarrinhoPage } from './carrinho.styles';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../helpers/calc.helpers';
import { setShowHeaderAndFooter, setShowHeaderInput } from '../../store/actions/routesActions';
import { moveResponsiveStep } from '../../store/actions/orderActions';

const CarrinhoPage = ({ screenWidth, products, dispatch, responsiveStep }) => {

    const router = useRouter();

    const isResponsive = useMemo(
        () => {
            return screenWidth < 750;
        },
        [screenWidth]
    )
    
    const totalValue = useMemo(
        () => {

            let sumOfPrices = 0;

            products.forEach(({ quantity, actualValueCents, promotionalValueCents }) => {
                const price = promotionalValueCents ? onlyNumberStringToFloatNumber(promotionalValueCents) : onlyNumberStringToFloatNumber(actualValueCents);
                sumOfPrices += price * quantity;
            })

            return sumOfPrices;

        },
        [products]
    )

    useEffect(() => {

        let show = {
            showHeader: true,
            showFooter: false,
            applyPageStyle: false,
        }
        if (!isResponsive) {
            show.applyPageStyle = true;
            show.showFooter = true;
            dispatch(setShowHeaderInput(true));
        } else {
            dispatch(setShowHeaderInput(false));
        }
        dispatch(setShowHeaderAndFooter(show));

    }, [isResponsive])

    const returnStep = () => {
        if (responsiveStep === 1) {
            router.back();
        } else {
            dispatch(moveResponsiveStep(false));
        }
    }

    return (
        <StyledCarrinhoPage screenWidth={screenWidth} isResponsive={isResponsive}>
            {isResponsive &&
                <>
                    {responsiveStep < 6
                        ? <div className="responsive-cart-container">
                            <div className="return-responsive-page">
                                <FontAwesomeIcon icon={faArrowLeft} onClick={returnStep} />
                                <a href="#" onClick={returnStep}>Voltar</a>
                            </div>
                            <div className="cart-responsive-info">
                                <h2>Seu<br /><b>Carrinho</b></h2>
                                <div className="product-info-row">
                                    <p>{products.length} produto{products.length <= 1 ? '' : 's'} selecionado{products.length <= 1 ? '' : 's'}</p>
                                    <p className="total-price"><strong>Total: {numberToReal(totalValue)}</strong></p>
                                </div>
                            </div>
                        </div>
                        : ''
                    }
                </>
            }
            <SaveOrderStepper isResponsive={isResponsive} className="stepper-container" />
            {!isResponsive &&
                <CartComponent className="cart-container" />
            }
        </StyledCarrinhoPage>
    )

}

const mapStateToProps = store => ({
    screenWidth: store.uiState.screenWidth,
    products: store.cartState.products,
    responsiveStep: store.orderState.responsiveStep,
});

export default connect(mapStateToProps)(CarrinhoPage);
