import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '../';
import { toggleProductModal } from '../../../store/actions/modalActions';
import { StyledProductModal } from './product-modal.styles';
import { addProduct } from '../../../store/actions/cartActions';
import { onlyNumberStringToFloatNumber, numberToReal } from '../../../helpers/calc.helpers';
import { SucessButtonComponent } from '../../button';
import { productSuffixes, deactivateCondition, addAmountFromSuffix, removeAmountFromSuffix } from '../../../helpers/product.helper';
import { floatToOneDigit } from '../../../helpers/pipes.helpers';
import { NoImageProduct } from '../../no-imagem-product';

const ProductModal = ({ dispatch, openProductModal, selectedProduct, screenWidth }) => {

    const [initialValues, setInitialValues] = useState({
        quantity: 0,
    });

    const hasStock = useMemo(
        () => {
            return Boolean(selectedProduct.quantityOnStock);
        },
        [selectedProduct.quantityOnStock]
    )

    const totalValue = useMemo(
        () => {

            const valueToUse = selectedProduct.promotionalValueCents || selectedProduct.actualValueCents;

            const finalValue = valueToUse
                ? onlyNumberStringToFloatNumber(valueToUse) * initialValues.quantity
                : 0;
            return numberToReal(finalValue);
        },
        [initialValues.quantity, selectedProduct.actualValueCents]
    )
    
    const deactivateQuantityManage = useMemo(
        () => {
            if (selectedProduct.quantitySuffix !== productSuffixes.KILOGRAM)
                return deactivateCondition({
                    quantitySuffix: selectedProduct.quantitySuffix,
                    quantity: initialValues.quantity,
                    quantityOnStock: selectedProduct.quantityOnStock,
                });
            return {
                canAdd: false,
                canRemove: false,
            };
        },
        [initialValues.quantity, selectedProduct.quantitySuffix, selectedProduct.quantityOnStock]
    )

    const suffixText = useMemo(
        () => {
            return selectedProduct.quantitySuffix === productSuffixes.UNITY ? productSuffixes.UNITY : productSuffixes.KILOGRAM;
        },
        [selectedProduct.quantitySuffix]
    )

    const isResponsive = useMemo(
        () => {
            return screenWidth <= 650;
        },
        [screenWidth]
    )

    const manageQuantity = plus => {

        const finalQuantity = plus
            ? addAmountFromSuffix({
                quantitySuffix: selectedProduct.quantitySuffix,
                quantity: initialValues.quantity,
            })
            : removeAmountFromSuffix({
                quantitySuffix: selectedProduct.quantitySuffix,
                quantity: initialValues.quantity,
            });
        setInitialValues({ quantity: finalQuantity });

    }

    const toggleModal = () => {
        dispatch(toggleProductModal());
    }

    const addToCart = () => {

        dispatch(addProduct({
            ...selectedProduct,
            quantity: initialValues.quantity,
        }));
        toggleModal();

    }

    const inputValue = useMemo(
        () => {

            if (selectedProduct.quantityOnStock === initialValues.quantity) {
                return initialValues.quantity.toFixed(3).replace('.', ',');
            }
            return initialValues.quantity.toFixed(3).replace('.', ',');

        },
        [initialValues.quantity]
    )

    const onChangeQuantityInput = e => {

        let onlyNumbers = e.target.value.replace(/\D/g, '');

        while (onlyNumbers.length < 4) {
            onlyNumbers = `0${onlyNumbers}`;
        }

        onlyNumbers = onlyNumbers.replace(/(\d{3})$/, '.$1')

        let unmaskedValue = Number(onlyNumbers).toFixed(3);

        if (unmaskedValue > selectedProduct.quantityOnStock) {
            unmaskedValue = selectedProduct.quantityOnStock;
        }

        setInitialValues({ quantity: Number(unmaskedValue) });

    }
    
    const freeToDigitInput = useMemo(
        () => {
            return selectedProduct.quantitySuffix === productSuffixes.KILOGRAM;
        },
        [selectedProduct.quantitySuffix]
    )

    const fixedQuantitySuffix = useMemo(
        () => {
            return selectedProduct.quantitySuffix === productSuffixes.UNITY ? '' : 'KG';
        },
        [selectedProduct.quantitySuffix]
    )

    const maskedValue = useMemo(
        () => {

            if (!freeToDigitInput) {
                if (fixedQuantitySuffix) {
                    return floatToOneDigit(initialValues.quantity);
                }
                return initialValues.quantity;
            }
            return 0;

        },
        [initialValues.quantity]
    )

    useEffect(() => {

        if (selectedProduct.quantitySuffix === productSuffixes.KILOGRAM) {
            setInitialValues({ quantity: 0.1 });
        } else if (selectedProduct.quantitySuffix === productSuffixes.TO_GRAM_100) {
            setInitialValues({ quantity: 0.1 });
        } else if (selectedProduct.quantitySuffix === productSuffixes.TO_GRAM_500) {
            setInitialValues({ quantity: 0.5 });
        } else {
            setInitialValues({ quantity: 1 });
        }

    }, [selectedProduct.quantitySuffix, selectedProduct.id])

    return (
        <ModalComponent show={openProductModal} toggleModal={toggleModal}>
            <StyledProductModal>
                <div className="product-image-container">
                    {selectedProduct.imgUrl
                        ? <img src={selectedProduct.imgUrl} alt={`Image do produto ${selectedProduct.name}`}/>
                        : <NoImageProduct className="no-image-product" />
                    }
                </div>
                <div className="product-info">
                    <div className="product-info-description">
                        <h2>{selectedProduct.name} {suffixText}</h2>
                        <h3>Descrição</h3>
                        <p>
                            {selectedProduct.description}
                        </p>
                        <p className="status-text">
                            Status: <span className={hasStock ? '' : 'product-no-stock'}>{hasStock ? 'disponível em estoque' : 'sem estoque'}</span>
                        </p>
                    </div>
                    <div className="product-info--actions">
                        <div className="quantity-container">
                            <p className="quantity-label">Quantidade</p>
                            {freeToDigitInput
                                ? <div className="quantity-input-container">
                                    <input
                                        className="quantity-input"
                                        type="text"
                                        placeholder="0 kg"
                                        onChange={onChangeQuantityInput}
                                        value={inputValue} />
                                </div>
                                : <div className="manage-quantity-container">
                                    <div>
                                        <button
                                            type="button"
                                            className={deactivateQuantityManage.canRemove ? 'left' : 'left deactivate-manage'}
                                            onClick={() => manageQuantity(false)}>-</button>
                                    </div>
                                    <div>
                                        <p className="quantity-text"><b>{maskedValue} {fixedQuantitySuffix}</b></p>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className={deactivateQuantityManage.canAdd ? 'right' : 'right deactivate-manage'}
                                            onClick={() => manageQuantity(true)}>+</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="value-container">
                            <div>
                                <p>Total</p>
                                <strong className="total-value">
                                    {totalValue}
                                </strong>
                            </div>
                        </div>
                        <div className="button-container">
                            <SucessButtonComponent
                                type="button"
                                notDense={isResponsive}
                                text="Adicionar ao carrinho"
                                type="button"
                                onClick={addToCart}
                                disabled={hasStock ? '' : 'true'} />
                        </div>
                    </div>
                </div>
            </StyledProductModal>
        </ModalComponent>
    )
}

const mapStateToProps = store => ({
    openProductModal: store.modalState.openProductModal,
    selectedProduct: store.modalState.selectedProduct,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(ProductModal);
