import React from 'react';
import Modal from "react-responsive-modal";

export default class ModalComponent extends React.Component {

  render() {

    const { show, children, toggleModal } = this.props;

    return (
      <Modal open={show} onClose={toggleModal} center>
          {children}
      </Modal>
    );
  }
};
