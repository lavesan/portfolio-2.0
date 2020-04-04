import React from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '../';
import { toogleOrderFinishedModal } from '../../../store/actions/modalActions';
import { FinishOrder } from './finish-order';

const FinishedOrderModal = ({ dispatch, openOrderFinishedModal }) => {

    const toggleModal = () => {
        dispatch(toogleOrderFinishedModal())
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openOrderFinishedModal}>
            <FinishOrder toggleModal={toggleModal} />
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openOrderFinishedModal: store.modalState.openOrderFinishedModal,
})

export default connect(mapStateToProps)(FinishedOrderModal);
