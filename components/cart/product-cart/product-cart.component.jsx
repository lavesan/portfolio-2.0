import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { StyledProductCart } from './product-cart.styles';
import { removeProduct, setProduct } from '../../../store/actions/cartActions';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../../helpers/calc.helpers';

const ProductCartComponent = ({ name, quantity, id, dispatch, imgUrl, actualValueCents, quantitySuffix }) => {

    const totalProductValue = useMemo(
        () => {
            const unityPrice = onlyNumberStringToFloatNumber(actualValueCents);
            return unityPrice * quantity;
        }, [actualValueCents, quantity]
    )

    const deactivateQuantitySubtract = useMemo(
        () => {
            return quantity <= 1;
        },
        [quantity]
    )

    const manageQuantity = (plus) => {

        const finalQuantity = plus ? quantity + 1 : quantity - 1;

        dispatch(setProduct({
            id,
            quantity: finalQuantity,
        }))
    }

    const remove = () => {
        dispatch(removeProduct({ id }));
    }

    return (
        <StyledProductCart deactivateQuantitySubtract={deactivateQuantitySubtract}>
            <div className="image-container">
                <p className="product-name">{name}</p>
                <img src={imgUrl} alt="Imagem do produto" />
            </div>
            <div className="quantity-container">
                <p className="quantity-text">Quant. <span className="quanity-number">{quantity} {quantitySuffix}</span></p>
                <div className="manage-quantity-container">
                    <button type="button" className="minus" onClick={() => manageQuantity(false)}>-</button>
                    <button type="button" onClick={() => manageQuantity(true)}>+</button>
                </div>
                <p className="value-text"><span>Valor:</span> <span>{numberToReal(totalProductValue)}</span></p>
            </div>
            <div className="cart-action-container" onClick={remove}>
                <FontAwesomeIcon icon={faTrashAlt} />
                <p>Remover</p>
            </div>
        </StyledProductCart>
    )

}

export default connect()(ProductCartComponent);
