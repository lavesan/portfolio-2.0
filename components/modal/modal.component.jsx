import React from 'react';
// import Modali from 'modali';
import Modal from "react-responsive-modal";

export default (show, setShow, children) => {

    const onCloseModal = () => {
        setShow(false);
    }

  return (
    <Modal open={show} onClose={onCloseModal} center>
        {children}
    </Modal>
  );
};
