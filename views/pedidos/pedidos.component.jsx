import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { StyledPedidosPage } from './pedidos.styles';
import { orderInstance } from '../../services/order.service';
import { setOrdersData } from '../../store/actions/orderActions';
import { OrderCardComponent } from './order-card';

const PedidosPage = ({ activeOrders, ordersData, dispatch }) => {

    const orderService = orderInstance.getInstance();

    const { addToast } = useToasts();

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const reloadOrders = useCallback(
        () => {

            orderService.findAllActiveByIds(activeOrders)
                .then(res => {
                    dispatch(setOrdersData(res));
                })
                .catch(({ message }) => {
                    showToast(message);
                });
            if (activeOrders && activeOrders.length) {
                setTimeout(() => {
                    reloadOrders();
                }, 120000);
            }

        },
        []
    )

    useEffect(() => {
        reloadOrders();
    }, []);

    return (
        <StyledPedidosPage>
            {ordersData.map(order => <OrderCardComponent key={order.id} {...order} />)}
        </StyledPedidosPage>
    )

}

const mapStateToProps = store => ({
    activeOrders: store.orderState.activeOrders,
    ordersData: store.orderState.ordersData,
});

export default connect(mapStateToProps)(PedidosPage);
