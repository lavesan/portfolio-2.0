import React from 'react';
import { connect } from "react-redux";

import { StyledAddressModal } from './address-modal.styles';
import { SearchInputComponent } from '../../search-input';
import senderImage from '../../../public/static/imgs/caricatura-entregador.png';
import theme from '../../../app/app.theme';
import { ModalComponent } from '../';
import { toggleAddressModal } from '../../../store/actions/modalActions'

const AddressModal = ({ dispatch, openAddressModal }) => {

    const text1 = 'o nosso entregador, se esforça muito para levar suas compras.'
    const text2 = 'Mas, antes de iniciá-las, verifique se o seu endereço tem disponibilidade de entrega :)'

    const toggleModal = () => {
        dispatch(toggleAddressModal());
    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openAddressModal}>
            <StyledAddressModal>
                <img className="sender-image" src={senderImage} alt="Caricatura do entregador" />
                <p className="text-paragrah">
                    <span className="highlight-text-paragraph">Seu China,</span> {text1}<br />
                    {text2}
                </p>
                <div className="find-cep-form">
                    <SearchInputComponent 
                        placeholder="Seu CEP"
                        button={{
                            text: 'Verificar',
                            color: '#fff',
                            backgroundColor: theme.green.primary,
                            borderColor: theme.green.primary,
                            title: 'Verificar o CEP',
                        }} />
                </div>
            </StyledAddressModal>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openAddressModal: store.modalState.openAddressModal,
})

export default connect(mapStateToProps)(AddressModal);
