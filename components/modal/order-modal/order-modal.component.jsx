import React, { useState } from 'react';
import { connect } from 'react-redux';

import { StyledOrderModalComponent } from './order-modal.styles';
import { toogleOrderToFinishModal } from '../../../store/actions/modalActions';
import { SucessButtonComponent } from '../../button';
import { orderInstance } from '../../../services/order.service';

const OrderModalComponent = ({ dispatch, orderData, openOrderToFinishModal }) => {

    const orderService = orderInstance.getInstance();

    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        dispatch(toogleOrderToFinishModal());
    }

    const activateOrder = async () => {

        setLoading(true);
        await orderService.confirmOrder()
            .then(res => {

            })
            .catch(err => {

            });
        setLoading(false);

    }

    return (
        <StyledOrderModalComponent toggleModal={toggleModal} show={openOrderToFinishModal}>
            <div className="title-container">
                <h2>Total detalhado da sua compra</h2>
            </div>
            <h3>Produtos</h3>
            {orderData.products.map(product => <p></p>)}
            <div className="value-container">
                <p className="value-text">Valor</p>
                <div></div>
                <p className="value-total"><strong></strong></p>
            </div>
            <h3>Frete</h3>
            <p>Endereço: {orderData.address.address}, {orderData.address.number} | CEP: {orderData.address.cep}</p>
            <div className="value-container">
                <p className="value-text">Valor</p>
                <div></div>
                <p className="value-total"><strong></strong></p>
            </div>
            <div className="confirm-row">
                <div className="total-value-container">
                    <p className="value-text">Valor</p>
                    <p className="value-total-big"><strong></strong></p>
                </div>
                <div>
                    <SucessButtonComponent
                        type="button"
                        notDense={'true'}
                        text="Confirmar pedido"
                        loading={loading}
                        onClick={activateOrder} />
                </div>
            </div>
        </StyledOrderModalComponent>
    )

}

const mapStateToProps = store => ({
    orderData: store.modalState.orderData,
    openOrderToFinishModal: store.modalState.openOrderToFinishModal,
})

export default connect(mapStateToProps)(OrderModalComponent);
