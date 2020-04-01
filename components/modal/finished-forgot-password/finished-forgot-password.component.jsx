import React from 'react';
import { connect } from 'react-redux';

import { ModalComponent } from '..';
import { toogleForgotPasswordSuccessModal } from '../../../store/actions/modalActions';
import { StyledFinishedForgotPassword } from './finished-forgot-password.styles';
import okIcon from '../../../public/static/imgs/ok-icon.png';

const FinishedOrderModal = ({ dispatch, openForgotPassworSuccessdModal }) => {

    const toggleModal = () => {
        dispatch(toogleForgotPasswordSuccessModal())
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openForgotPassworSuccessdModal}>
            <StyledFinishedForgotPassword>
                <h2>Enviado com sucesso</h2>
                <img src={okIcon} alt="Ícone de ordem finalizada"/>
                <p>Agora verifique seu email.</p>
            </StyledFinishedForgotPassword>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openForgotPassworSuccessdModal: store.modalState.openForgotPassworSuccessdModal,
})

export default connect(mapStateToProps)(FinishedOrderModal);
