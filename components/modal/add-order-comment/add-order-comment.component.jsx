import React from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '../';
import { toogleAddOrderCommentModal } from '../../../store/actions/modalActions';
import { AddCommentCompoent } from './add-comment';

const AddOrderCommentModal = ({ openAddOrderCommentModal, dispatch }) => {

    const toggleModal = () => {
        dispatch(toogleAddOrderCommentModal());
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openAddOrderCommentModal}>
            <AddCommentCompoent toggleModal={toggleModal} />
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openAddOrderCommentModal: store.modalState.openAddOrderCommentModal,
})

export default connect(mapStateToProps)(AddOrderCommentModal);
