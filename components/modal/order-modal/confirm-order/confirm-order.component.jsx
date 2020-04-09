import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { SucessButtonComponent } from '../../../button';
import { orderInstance } from '../../../../services/order.service';
import { numberStringToReal, numberToReal, onlyNumberStringToFloatNumber } from '../../../../helpers/calc.helpers';
import { toogleOrderFinishedModal } from '../../../../store/actions/modalActions';
import { translateQuantitySuffixToUser } from '../../../../helpers/product.helper';
import { setActiveOrders, clearOrderForm, setOrderId, setSelectedOrderId } from '../../../../store/actions/orderActions';
import { clearCart } from '../../../../store/actions/cartActions';
import { moveResponsiveStep } from '../../../../store/actions/orderActions';
import { StyledOrderModalComponent } from '../order-modal.styles';
import { encode } from '../../../../helpers/auth.helpers';

const ConfirmOrder = ({ toggleModal, dispatch, orderData, cardStep }) => {

    const orderService = orderInstance.getInstance();

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const saveActiveOrders = id => {

        let orderIds = [id];
        const ordersFromStorage = localStorage.getItem('orders');
        if (ordersFromStorage) {
            const orders = JSON.parse(ordersFromStorage);
            if (orders) {
                orderIds = orderIds.concat(orders);
            }
        }

        // Removes the invalid Values
        orderIds = orderIds.filter(id => id);

        localStorage.setItem('orders', JSON.stringify(orderIds));

        dispatch(setActiveOrders(orderIds));

    }

    const activateOrder = async () => {

        setLoading(true);

        const body = {
            id: orderData.order.id,
            saveCard: cardStep.saveCard,
        }

        if (!cardStep.payLatter) {

            const cardData = {
                id: cardStep.id,
                legalDocument: cardStep.cpf ? cardStep.cpf.replace(/\D/g, '') : '',
                securityCode: cardStep.cvv,
                nameOnCard: cardStep.fullname,
                number: cardStep.number.replace(/\D/g, ''),
                expirationMonth: cardStep.dueDate.match(/^\d{2}/)[0],
                expirationYear: cardStep.dueDate.match(/\d{2}$/)[0],
                brand: cardStep.brand.value,
            }

            // Encode the card data to send the back-end
            body.card = encode(cardData);

        }

        await orderService.confirmOrder(body)
            .then(res => {

                saveActiveOrders(res.id);

                // Clears the cart
                dispatch(clearCart());
                // Clear the order form
                dispatch(clearOrderForm());
                // Clears the order Id
                dispatch(setOrderId(''));
                dispatch(setSelectedOrderId(res.id));
                localStorage.setItem('selectedOrderId', res.id);

                if (toggleModal) {
                    toggleModal();
                    dispatch(toogleOrderFinishedModal());
                } else {
                    dispatch(moveResponsiveStep(true));
                }

            })
            .catch(({ message }) => {
                showToast(message);
            });
        setLoading(false);

    }

    const valueFromProduct = product => {

        const prodValue = product.promotionalValueCents
            ? onlyNumberStringToFloatNumber(product.promotionalValueCents) * product.quantity
            : onlyNumberStringToFloatNumber(product.actualValueCents) * product.quantity;

        return numberToReal(prodValue);

    }

    return (
        <StyledOrderModalComponent isResponsive={!toggleModal}>
            {toggleModal &&
                <div className="title-container">
                    <h2>Total detalhado da sua compra</h2>
                </div>
            }
            <div className="modal-body">
                <h3 className="products-title" style={{ marginBottom: 0 }}>Produtos</h3>
                {orderData.products.map(product =>
                    <div className="product-row">
                        <p><b>{product.quantity}{translateQuantitySuffixToUser(product.quantitySuffix)} {product.name}</b></p>
                        <p className="product-row--price">{valueFromProduct(product)}</p>
                    </div>
                    )
                }
                <div className="value-container">
                    <p className="value-text">VALOR</p>
                    <div></div>
                <p className="value-total"><strong>{numberStringToReal(orderData.order.totalProductValueCents)}</strong></p>
                </div>
                <h3>Frete</h3>
                <p>Endereço: {orderData.address.address}, {orderData.address.number} | CEP: {orderData.address.cep}</p>
                <div className="value-container">
                    <p className="value-text">VALOR</p>
                    <div></div>
                    <p className="value-total"><strong>{numberStringToReal(orderData.order.totalFreightValuesCents)}</strong></p>
                </div>
                <div className="confirm-row">
                    <div className="total-value-container">
                        <p className="value-text">TOTAL A PAGAR</p>
                        <p className="value-total-big"><strong>{numberStringToReal(orderData.order.totalValueCents)}</strong></p>
                    </div>
                    <div className="submit-button-container">
                        <SucessButtonComponent
                            type="button"
                            text="Confirmar pedido"
                            notDense={!toggleModal}
                            style={toggleModal && { height: '100%' }}
                            loading={loading}
                            onClick={activateOrder} />
                    </div>
                </div>
            </div>
        </StyledOrderModalComponent>
    )

}

const mapStateToProps = store => ({
    orderData: store.modalState.orderData,
    cardStep: store.orderState.cardStep,
})

export default connect(mapStateToProps)(ConfirmOrder);
