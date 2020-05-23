import React from 'react';
import Modal from "react-responsive-modal";

import { IModal } from './modal.interfaces';

export default class ModalComponent extends React.Component<IModal> {

  render() {

    const { show, children, toggleModal } = this.props;

    return (
      <Modal open={show} onClose={toggleModal} center>
        {children}
      </Modal>
    );
  }
};
