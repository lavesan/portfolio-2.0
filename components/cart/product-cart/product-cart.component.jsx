import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { StyledProductCart } from './product-cart.styles';
import { removeProduct, setProduct } from '../../../store/actions/cartActions';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../../helpers/calc.helpers';
import { addAmountFromSuffix, removeAmountFromSuffix, deactivateCondition, productSuffixes } from '../../../helpers/product.helper';
import { onlyNumberStringToThreeDigit } from '../../../helpers/mask.helpers';
import { numberStringToFloatThreeDigit } from '../../../helpers/unmask.helpers';
import { floatToOneDigit } from '../../../helpers/pipes.helpers';

const ProductCartComponent = ({ name, quantity, id, dispatch, imgUrl, actualValueCents, quantitySuffix, quantityOnStock, hideRemove }) => {

    const totalProductValue = useMemo(
        () => {
            const unityPrice = onlyNumberStringToFloatNumber(actualValueCents);
            return unityPrice * quantity;
        }, [actualValueCents, quantity]
    )

    const freeToDigitInput = useMemo(
        () => {
            return quantitySuffix === productSuffixes.KILOGRAM;
        },
        [quantitySuffix]
    )

    const fixedQuantitySuffix = useMemo(
        () => {
            return quantitySuffix === productSuffixes.UNITY ? '' : 'KG';
        },
        [quantitySuffix]
    )

    const maskedValue = useMemo(
        () => {
            if (fixedQuantitySuffix) {
                return floatToOneDigit(quantity);
            }
            return quantity;
        },
        [quantity]
    )

    const deactivateQuantityManage = useMemo(
        () => {
            if (quantitySuffix !== productSuffixes.KILOGRAM)
                return deactivateCondition({ quantitySuffix, quantity, quantityOnStock });
            return {
                canAdd: false,
                canRemove: false,
            };
        },
        [quantity, quantitySuffix, quantityOnStock]
    )

    const manageQuantity = (plus) => {

        const finalQuantity = plus
            ? addAmountFromSuffix({ quantitySuffix, quantity })
            : removeAmountFromSuffix({ quantitySuffix, quantity });

        dispatch(setProduct({
            id,
            quantity: finalQuantity,
        }))
    }

    const inputValue = useMemo(
        () => {
            if (quantityOnStock === quantity) {
                return quantity.toFixed(3).replace('.', ',');
            }
            return onlyNumberStringToThreeDigit(quantity);
        },
        [quantity]
    )

    const remove = () => {
        dispatch(removeProduct({ id }));
    }

    const onChangeQuantityInput = e => {

        const lastNumbers = e.target.value.replace(/(\d{3})$/, ',$1');
        const rightValue = lastNumbers.replace(/^(\d*)\,/, '$1');

        let unmaskedValue = numberStringToFloatThreeDigit(rightValue);

        if (unmaskedValue > quantityOnStock) {
            unmaskedValue = quantityOnStock;
        }

        dispatch(setProduct({
            id,
            quantity: unmaskedValue,
        }))

    }

    return (
        <StyledProductCart hideRemove={hideRemove}>
            <div className="image-container">
                <p className="product-name">{name}</p>
                <img src={imgUrl} alt="Imagem do produto" />
            </div>
            <div className="quantity-container">
                <p className="quantity-title">Quantidade</p>
                {freeToDigitInput
                    ? <div className="quantity-input-container">
                        <input
                            className="quantity-input"
                            type="text"
                            onChange={onChangeQuantityInput}
                            value={inputValue} />
                    </div>
                    : <div className="manage-quantity-container">
                        <button
                            type="button"
                            className={deactivateQuantityManage.canRemove ? '' : 'deactivate-manage'}
                            onClick={() => manageQuantity(false)}>-</button>
                        <p className="quantity-text"><b>{maskedValue} {fixedQuantitySuffix}</b></p>
                        <button
                            type="button"
                            className={deactivateQuantityManage.canAdd ? '' : 'deactivate-manage'}
                            onClick={() => manageQuantity(true)}>+</button>
                    </div>
                }
                <p className="value-text"><span>Valor:</span> <strong>{numberToReal(totalProductValue)}</strong></p>
            </div>
            {!hideRemove &&
                <div className="cart-action-container" onClick={remove}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <p>Remover</p>
                </div>
            }
        </StyledProductCart>
    )

}

export default connect()(ProductCartComponent);
