import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { ModalComponent } from '..';
import { toogleForgotPasswordModal, toogleForgotPasswordSuccessModal } from '../../../store/actions/modalActions';
import { StyledForgotPasswordModal } from './forgot-password-modal.styles';
import { FormTextMaterial } from '../../form/form-text-material';
import { isRequired, validateEmail } from '../../../helpers/validations.helpers';
import { authInstance } from '../../../services/auth.service';
import { SucessButtonComponent } from '../../button';

const FinishedOrderModal = ({ dispatch, openForgotPasswordModal }) => {

    const { addToast } = useToasts();

    const authService = authInstance.getInstance();

    const [form, setForm] = useState({
        email: '',
    });

    const [formValidations, setFormValidations] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const toggleModal = () => {
        dispatch(toogleForgotPasswordModal())
    }

    const setFieldValue = (name, value) => {
        setForm(f => ({
            ...f,
            [name]: value,
        }));
    }

    const isFormInvalid = () => {

        const formInvalid = Object.values(formValidations);
        return formInvalid.some(validation => validation && validation.invalid);

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        if (isFormInvalid()) {
            if (!submitted) {
                setSubmitted(true);
            }
        } else {

            setLoading(true);
            await authService.forgotPassword(form)
                .then(res => {
                    toggleModal();
                    dispatch(toogleForgotPasswordSuccessModal());
                })
                .catch(({ message }) => {
                    showToast(message);
                });
            setLoading(false);

        }

    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openForgotPasswordModal}>
            <StyledForgotPasswordModal onSubmit={onSubmit}>
                <h2>Recuperar senha</h2>
                <p className="forgot-description">Vamos te enviar as informações necessárias para você acessar sua conta novamente.</p>
                <FormTextMaterial
                    label="Email"
                    name="email"
                    placeholder="Seu email aqui"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired, validateEmail]}
                    value={form.email}
                    startValidations={submitted}
                    onChange={setFieldValue} />
                <SucessButtonComponent
                    type="submit"
                    notDense={'true'}
                    text="Enviar"
                    className="forgot-password-button"
                    loading={loading} />
            </StyledForgotPasswordModal>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openForgotPasswordModal: store.modalState.openForgotPasswordModal,
})

export default connect(mapStateToProps)(FinishedOrderModal);
