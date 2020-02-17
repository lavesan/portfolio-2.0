import React from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '../';
import { toggleProductModal } from '../../../store/actions/modalActions';

const ProductModal = ({ dispatch }) => {

    const toggleModal = () => {
        dispatch(toggleProductModal());
    }

    return (
        <ModalComponent show={openProductModal} toggleModal={toggleModal}>
            
        </ModalComponent>
    )
}

const mapStateToProps = store => ({
    openProductModal: store.modalState.openProductModal,
})

export default connect(mapStateToProps)(ProductModal);
