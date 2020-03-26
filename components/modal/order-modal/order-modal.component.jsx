import React from 'react';
import { connect } from 'react-redux';

import { StyledOrderModalComponent } from './order-modal.styles';
import { toogleOrderToFinishModal } from '../../../store/actions/modalActions';

const OrderModalComponent = ({ dispatch, orderData, openOrderToFinishModal }) => {

    const toggleModal = () => {
        dispatch(toogleOrderToFinishModal());
    }

    return (
        <StyledOrderModalComponent toggleModal={toggleModal} show={openOrderToFinishModal}>
            
        </StyledOrderModalComponent>
    )

}

const mapStateToProps = store => ({
    orderData: store.modalState.orderData,
    openOrderToFinishModal: store.modalState.openOrderToFinishModal,
})

export default connect(mapStateToProps)(OrderModalComponent);
