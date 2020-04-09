import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { StyledProductCart } from './product-cart.styles';
import { removeProduct, setProduct } from '../../../store/actions/cartActions';
import { numberToReal, onlyNumberStringToFloatNumber } from '../../../helpers/calc.helpers';
import { addAmountFromSuffix, removeAmountFromSuffix, deactivateCondition, productSuffixes } from '../../../helpers/product.helper';
import { floatToOneDigit } from '../../../helpers/pipes.helpers';
import { NoImageProduct } from '../../../components/no-imagem-product';

const ProductCartComponent = ({ name, quantity, id, dispatch, imgUrl, actualValueCents, promotionalValueCents, quantitySuffix, quantityOnStock, hideRemove, isResponsive }) => {

    const totalProductValue = useMemo(
        () => {
            const unityPrice = promotionalValueCents ? onlyNumberStringToFloatNumber(promotionalValueCents) : onlyNumberStringToFloatNumber(actualValueCents);
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

            if (!freeToDigitInput) {
                if (fixedQuantitySuffix) {
                    return floatToOneDigit(quantity);
                }
                return quantity;
            }
            return 0;

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

    const manageQuantity = plus => {

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
            return quantity.toFixed(3).replace('.', ',');

        },
        [quantity]
    )

    const remove = () => {
        dispatch(removeProduct({ id }));
    }

    const onChangeQuantityInput = e => {

        let onlyNumbers = e.target.value.replace(/\D/g, '');

        while (onlyNumbers.length < 4) {
            onlyNumbers = `0${onlyNumbers}`;
        }

        onlyNumbers = onlyNumbers.replace(/(\d{3})$/, '.$1')

        let unmaskedValue = Number(onlyNumbers).toFixed(3);

        if (unmaskedValue > quantityOnStock) {
            unmaskedValue = quantityOnStock;
        }

        dispatch(setProduct({
            id,
            quantity: Number(unmaskedValue),
        }))

    }

    return (
        <StyledProductCart hideRemove={hideRemove} isResponsive={isResponsive}>
            <div className="image-container">
                <p className="product-name">{name}</p>
                {imgUrl
                    ? <img src={imgUrl} alt="Imagem do produto" />
                    : <NoImageProduct className="no-image-cart-product" />
                }
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
