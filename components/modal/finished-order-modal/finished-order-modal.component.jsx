import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";

import { ModalComponent } from '../';
import { toogleOrderFinishedModal } from '../../../store/actions/modalActions';
import { SucessButtonComponent } from '../../button';
import { StyledFinishedOrderModal } from './finished-order-modal.styles';
import okIcon from '../../../public/static/imgs/ok-icon.png';

const FinishedOrderModal = ({ dispatch, openOrderFinishedModal }) => {

    const router = useRouter();

    const toggleModal = () => {
        dispatch(toogleOrderFinishedModal())
    }

    const navigateToOrder = () => {
        router.push('/pedidos');
        toggleModal();
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openOrderFinishedModal}>
            <StyledFinishedOrderModal>
                <img src={okIcon} alt="Ícone de ordem finalizada"/>
                <p>Compra realizada com sucesso</p>
                <SucessButtonComponent
                    type="button"
                    notDense={'true'}
                    text="Ver status do pedido"
                    onClick={navigateToOrder} />
            </StyledFinishedOrderModal>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openOrderFinishedModal: store.modalState.openOrderFinishedModal,
})

export default connect(mapStateToProps)(FinishedOrderModal);
