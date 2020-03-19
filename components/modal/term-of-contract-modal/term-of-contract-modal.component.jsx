import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { ModalComponent } from '../';
import { StyledTermOfContractModal } from './term-of-contract-modal.styles';
import { toggleTermOfContractModal } from '../../../store/actions/modalActions';
import { FliesService } from '../../../services/files.service';

const TermOfContractModal = ({ dispatch, openTermOfContractModal }) => {

    const fileService = new FliesService();

    const toggleModal = () => {
        dispatch(toggleTermOfContractModal());
    }

    const [term, setTerm] = useState('');

    useEffect(() => {
        fileService.getTermOfContract()
            .then(res => {
                setTerm(res);
            })
    }, [])

    return (
        <ModalComponent toggleModal={toggleModal} show={openTermOfContractModal}>
            <StyledTermOfContractModal>
                {term && <iframe src={term}></iframe>}
            </StyledTermOfContractModal>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openTermOfContractModal: store.modalState.openTermOfContractModal,
})

export default connect(mapStateToProps)(TermOfContractModal);
