import React from 'react';
import Modal from "react-responsive-modal";

import { StyledModal } from './modal.styles';

export default class ModalComponent extends React.Component {

  render() {

    const { show, children, toggleModal } = this.props;

    return (
      <Modal open={show} onClose={toggleModal} center>
        <StyledModal>
          <button type="button" className="close-button" onClick={toggleModal}>FECHAR</button>
        </StyledModal>
        {children}
      </Modal>
    );
  }
};
