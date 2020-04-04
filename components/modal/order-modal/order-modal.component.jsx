import React from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '../';
import { toogleOrderToFinishModal } from '../../../store/actions/modalActions';
import { ConfirmOrder } from './confirm-order';

const OrderModalComponent = ({ dispatch, openOrderToFinishModal }) => {

    const toggleModal = () => {
        dispatch(toogleOrderToFinishModal());
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openOrderToFinishModal}>
            <ConfirmOrder toggleModal={toggleModal} />
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openOrderToFinishModal: store.modalState.openOrderToFinishModal,
})

export default connect(mapStateToProps)(OrderModalComponent);
