import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '../';
import { toggleProductModal } from '../../../store/actions/modalActions';
import { StyledProductModal } from './product-modal.styles';
import { addProduct } from '../../../store/actions/cartActions';
import { onlyNumberStringToFloatNumber, numberToReal } from '../../../helpers/calc.helpers';
import { StyledSuccessButton } from '../../button';

const ProductModal = ({ dispatch, openProductModal, selectedProduct }) => {

    const [initialValues, setInitialValues] = useState({
        quantity: 1,
    });

    const hasStock = useMemo(
        () => {
            return Boolean(selectedProduct.quantityOnStock);
        },
        [selectedProduct.quantityOnStock]
    )

    const totalValue = useMemo(
        () => {
            const finalValue = selectedProduct.actualValueCents ? onlyNumberStringToFloatNumber(selectedProduct.actualValueCents) * initialValues.quantity : 0;
            return numberToReal(finalValue);
        },
        [initialValues.quantity, selectedProduct.actualValueCents]
    )

    const manageQuantity = (plus) => {
        setInitialValues(({ quantity }) => plus ? ({ quantity: quantity + 1 }) : ({ quantity: quantity - 1 }));
    }

    const toggleModal = () => {
        dispatch(toggleProductModal());
    }

    const addToCart = () => {
        dispatch(addProduct({
            ...selectedProduct,
            quantity: 1,
        }));
        toggleModal();
    }

    return (
        <ModalComponent show={openProductModal} toggleModal={toggleModal}>
            <StyledProductModal>
                <div className="product-image-container">
                    <img src={selectedProduct.imgUrl} alt={`Image do produto ${selectedProduct.name}`}/>
                </div>
                <div className="product-info">
                    <div className="product-info-description">
                        <h2>{selectedProduct.name} 1{selectedProduct.quantitySuffix}</h2>
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
                            <div className="quantity-input">
                                <p title="Subtrair" className={initialValues.quantity <= 1 ? 'disabled' : ''} onClick={() => manageQuantity(false)}>-</p>
                                <p className="quantity-value">{initialValues.quantity}</p>
                                <p title="Adicionar" onClick={() => manageQuantity(true)}>+</p>
                            </div>
                        </div>
                        <div className="value-container">
                            <div>
                                <p>Total</p>
                                <strong className="total-value">
                                    {totalValue}
                                </strong>
                            </div>
                        </div>
                        <div>
                            <StyledSuccessButton
                                type="button"
                                onClick={addToCart}
                                disabled={hasStock ? '' : 'true'}>
                                Adicionar ao carrinho
                            </StyledSuccessButton>
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
})

export default connect(mapStateToProps)(ProductModal);
