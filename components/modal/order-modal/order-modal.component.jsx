import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { StyledOrderModalComponent } from './order-modal.styles';
import { toogleOrderToFinishModal } from '../../../store/actions/modalActions';
import { SucessButtonComponent } from '../../button';
import { orderInstance } from '../../../services/order.service';
import { numberStringToReal } from '../../../helpers/calc.helpers';
import { ModalComponent } from '../';
import { toogleOrderFinishedModal } from '../../../store/actions/modalActions';

const OrderModalComponent = ({ dispatch, orderData, openOrderToFinishModal, cardStep }) => {

    const orderService = orderInstance.getInstance();

    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        dispatch(toogleOrderToFinishModal());
    }

    const activateOrder = async () => {

        setLoading(true);

        const body = {
            id: orderData.order.id,
            saveCard: cardStep.saveCard,
            card: {
                id: cardStep,
                paymentType: cardStep.paymentType,
                legalDocument: cardStep.legalDocument,
                cvv: cardStep.cvv,
                fullname: cardStep.fullname,
                number: cardStep.number,
                dueDate: cardStep.dueDate,
                saveCard: cardStep.saveCard,
            },
        }

        await orderService.confirmOrder(body)
            .then(res => {
                toggleModal();
                setTimeout(() => {
                    dispatch(toogleOrderFinishedModal());
                }, 100);
            })
            .catch(err => {

            });
        setLoading(false);

    }

    const removeAllDigits = value => {
        return value.replace(/^\d+/, '');
    }

    useEffect(() => {
        console.log('orderData: ', orderData);
    }, [])

    return (
        <ModalComponent toggleModal={toggleModal} show={openOrderToFinishModal}>
            <StyledOrderModalComponent>
                <div className="title-container">
                    <h2>Total detalhado da sua compra</h2>
                </div>
                <div className="modal-body">
                    <h3 className="products-title">Produtos</h3>
                    {orderData.products.map(product =>
                        <p>{product.quantity}{removeAllDigits(product.quantitySuffix)} {product.name}</p>)
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
