import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { StyledSaveOrderForm } from './save-order-stepper.styles';
import { OrderAddressStepForm } from './order-address-step-form';
import { SchedulerStepFormComponent } from './scheduler-step-form';
import { OrderCardStepForm } from './order-second-step-form';
import { SucessButtonComponent } from '../../../components/button';
import { toogleAddOrderCommentModal } from '../../../store/actions/modalActions';

const SaveOrderStepper = ({ className, cardStep, dispatch, products, addressValidations, scheduleValidations, cardValidations, token }) => {

    const { addToast } = useToasts();

    const [submitted, setSubmitted] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const formInvalid = () => {

        if (!products.length) {
            showToast('Não há produtos no seu carrinho.');
            return true;
        }

        const cardStepValidate = cardStep.payLatter
            ? ['paymentType', 'legalDocument', 'paymentoMethod', 'changeValueCents']
            : ['paymentType', 'legalDocument', 'paymentoMethod', 'cvv', 'fullname', 'dueDate'];

        const cardStepInvalid = cardStepValidate.some(value => cardValidations[value] && cardValidations[value].invalid);

        const addressStepValidate = token
            ? ['id', 'cep', 'district', 'address', 'number', 'complement']
            : ['id', 'cep', 'district', 'address', 'number', 'complement', 'phoneNumber', 'userName'];

        if (token && !userInfo.contacts.length) {
            addressStepValidate.push('phoneNumber');
        }

        const addressStepInvalid = addressStepValidate.some(value => addressValidations[value] && addressValidations[value].invalid);

        const scheduleStepInvalid = Object.values(scheduleValidations).some(value => value.invalid);

        return cardStepInvalid || addressStepInvalid || scheduleStepInvalid;

    }

    const validateOrderForm = () => {
        return new Promise((resolve, reject) => {

            if (!submitted) {
                setSubmitted(true);
            }
    
            if (formInvalid()) {
                reject();
            }
            resolve();

        })
    }

    const onSubmit = async (e) => {

        e.preventDefault();

        await validateOrderForm();

        dispatch(toogleAddOrderCommentModal());

    }

    return (
        <StyledSaveOrderForm className={className} onSubmit={onSubmit}>
            <OrderAddressStepForm submitted={submitted} />
            <SchedulerStepFormComponent submitted={submitted} />
            <OrderCardStepForm submitted={submitted} />
            <div className="action-button-row">
                <SucessButtonComponent
                    type="submit"
                    text="Confirmar dados" />
            </div>
        </StyledSaveOrderForm>
    )
}

const mapStateToProps = store => ({
    cardStep: store.orderState.cardStep,
    scheduleValidations: store.orderState.scheduleValidations,
    addressValidations: store.orderState.addressValidations,
    cardValidations: store.orderState.cardValidations,
    userInfo: store.authState.userInfo,
    products: store.cartState.products,
    token: store.authState.token,
})

export default connect(mapStateToProps)(SaveOrderStepper);
