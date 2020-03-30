import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { StyledPedidosPage } from './pedidos.styles';
import { orderInstance } from '../../services/order.service';
import { setOrdersData } from '../../store/actions/orderActions';
import { OrderCardComponent } from './order-card';

const PedidosPage = ({ activeOrders, ordersData, dispatch }) => {

    const orderService = orderInstance.getInstance();

    const reloadOrders = useCallback(
        () => {

            orderService.findAllActiveByIds(activeOrders)
                .then(res => {
                    dispatch(setOrdersData(res));
                })
                .catch(err => {
                    console.log('deu pau vei');
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
