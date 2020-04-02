import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { ModalComponent } from '../';
import { StyledOrderModalComponent } from './order-modal.styles';
import { toogleOrderToFinishModal } from '../../../store/actions/modalActions';
import { SucessButtonComponent } from '../../button';
import { orderInstance } from '../../../services/order.service';
import { numberStringToReal } from '../../../helpers/calc.helpers';
import { toogleOrderFinishedModal } from '../../../store/actions/modalActions';
import { removeAllFirstDigits } from '../../../helpers/unmask.helpers';
import { setActiveOrders, clearOrderForm } from '../../../store/actions/orderActions';
import { clearCart } from '../../../store/actions/cartActions';

const OrderModalComponent = ({ dispatch, orderData, openOrderToFinishModal, cardStep }) => {

    const orderService = orderInstance.getInstance();

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const toggleModal = () => {
        dispatch(toogleOrderToFinishModal());
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
            body.card = {
                id: cardStep.id,
                legalDocument: cardStep.cpf ? cardStep.cpf.replace(/\D/g, '') : '',
                securityCode: cardStep.cvv,
                nameOnCard: cardStep.fullname,
                number: cardStep.number.replace(/\D/g, ''),
                expirationMonth: cardStep.dueDate.match(/^\d{2}/),
                expirationYear: cardStep.dueDate.match(/\d{2}$/),
                brand: cardStep.brand.value,
            }
        }

        await orderService.confirmOrder(body)
            .then(res => {
                toggleModal();
                saveActiveOrders(res.id);

                // Clears the cart
                dispatch(clearCart());
                // Clear the order form
                dispatch(clearOrderForm());

                dispatch(toogleOrderFinishedModal());
            })
            .catch(({ message }) => {
                showToast(message);
            });
        setLoading(false);

    }
    
    const valueFromProduct = product => {
        return product.promotionalValueCents
            ? numberStringToReal(product.promotionalValueCents)
            : numberStringToReal(product.actualValueCents);
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openOrderToFinishModal}>
            <StyledOrderModalComponent>
                <div className="title-container">
                    <h2>Total detalhado da sua compra</h2>
                </div>
                <div className="modal-body">
                    <h3 className="products-title" style={{ marginBottom: 0 }}>Produtos</h3>
                    {orderData.products.map(product =>
                        <div className="product-row">
                            <p><b>{product.quantity}{removeAllFirstDigits(product.quantitySuffix)} {product.name}</b></p>
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
                        <div>
                            <SucessButtonComponent
                                type="button"
                                text="Confirmar pedido"
                                style={{ height: '100%' }}
                                loading={loading}
                                onClick={activateOrder} />
                        </div>
                    </div>
                </div>
            </StyledOrderModalComponent>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    orderData: store.modalState.orderData,
    openOrderToFinishModal: store.modalState.openOrderToFinishModal,
    cardStep: store.orderState.cardStep,
})

export default connect(mapStateToProps)(OrderModalComponent);
