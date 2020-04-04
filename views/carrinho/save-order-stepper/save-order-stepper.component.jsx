import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { StyledSaveOrderForm } from './save-order-stepper.styles';
import { OrderAddressStepForm } from './order-address-step-form';
import { SchedulerStepFormComponent } from './scheduler-step-form';
import { OrderCardStepForm } from './order-second-step-form';
import { SucessButtonComponent } from '../../../components/button';
import { toogleAddOrderCommentModal } from '../../../store/actions/modalActions';
import { moveResponsiveStep } from '../../../store/actions/orderActions';
import { AddCommentCompoent } from '../../../components/modal/add-order-comment/add-comment';
import { ConfirmOrder } from '../../../components/modal/order-modal/confirm-order';
import { FinishOrder } from '../../../components/modal/finished-order-modal/finish-order';

const SaveOrderStepper = ({ className, cardStep, dispatch, products, addressValidations, scheduleValidations, cardValidations, token, isResponsive, responsiveStep }) => {

    const { addToast } = useToasts();

    const [submitted, setSubmitted] = useState(false);
    const [submittedStep, setSubmittedStep] = useState({
        address: false,
        schedule: false,
        card: false,
    })

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const cardStepInvalid = () => {
        
        const cardStepValidate = cardStep.payLatter
            ? ['paymentType', 'legalDocument', 'paymentoMethod', 'changeValueCents']
            : ['paymentType', 'legalDocument', 'paymentoMethod', 'cvv', 'fullname', 'dueDate', 'brand'];

        return cardStepValidate.some(value => cardValidations[value] && cardValidations[value].invalid);

    }

    const addressStepInvalid = () => {
        
        const addressStepValidate = token
            ? ['id', 'cep', 'district', 'address', 'number', 'complement']
            : ['id', 'cep', 'district', 'address', 'number', 'complement', 'phoneNumber', 'userName'];

        if (token && !userInfo.contacts.length) {
            addressStepValidate.push('phoneNumber');
        }

        return addressStepValidate.some(value => addressValidations[value] && addressValidations[value].invalid);

    }

    const scheduleStepInvalid = () => {
        return Object.values(scheduleValidations).some(value => value.invalid);
    }

    const validateProducts = () => {
        
        if (!products.length) {
            showToast('Não há produtos no seu carrinho.');
            return true;
        }
        return false;

    }

    const formInvalid = () => {
        return validateProducts() || cardStepInvalid() || addressStepInvalid() || scheduleStepInvalid();
    }

    const validateResponsiveStep = () => {

        const handleStepName = {
            1: {
                name: 'address',
                validateFunc: addressStepInvalid,
            },
            2: {
                name: 'schedule',
                validateFunc: scheduleStepInvalid,
            },
            3: {
                name: 'card',
                validateFunc: cardStepInvalid,
            },
        }

        const stepName = handleStepName[responsiveStep];

        return new Promise((resolve, reject) => {

            if (!submittedStep[stepName.name]) {
                setSubmittedStep(f => ({
                    ...f,
                    [stepName.name]: true,
                }));
            }

            if (validateProducts() || stepName.validateFunc()) {
                reject();
            }
            resolve();

        })
    }

    const goToNextStep = async () => {

        await validateResponsiveStep();
        
        dispatch(moveResponsiveStep(true));

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

    const ResponsiveFormStep = useMemo(
        () => {

            const manageFormStep = {
                1: {
                    Component: OrderAddressStepForm,
                    submitted: submittedStep.address,
                },
                2: {
                    Component: SchedulerStepFormComponent,
                    submitted: submittedStep.schedule,
                },
                3: {
                    Component: OrderCardStepForm,
                    submitted: submittedStep.card,
                },
                4: {
                    Component: AddCommentCompoent,
                    submitted: true,
                },
                5: {
                    Component: ConfirmOrder,
                    submitted: true,
                },
                6: {
                    Component: FinishOrder,
                    submitted: true,
                },
            }

            return manageFormStep[responsiveStep];

        },
        [responsiveStep]
    )

    return (
        <StyledSaveOrderForm className={className} onSubmit={onSubmit}>
            {isResponsive
                ? <div className="responsive-form">
                    <ResponsiveFormStep.Component isResponsive={isResponsive} submitted={ResponsiveFormStep.submitted || submitted} />
                </div>
                : <>
                    <OrderAddressStepForm submitted={submitted} />
                    <SchedulerStepFormComponent submitted={submitted} />
                    <OrderCardStepForm submitted={submitted} />
                </>
            }
            {isResponsive
                ? <div>
                    {responsiveStep <= 4
                        ? <SucessButtonComponent
                            type="button"
                            onClick={goToNextStep}
                            className="responsive-success-button"
                            text="Avançar" />
                        : ''
                    }
                    {/* {responsiveStep === 5
                        ? <SucessButtonComponent
                            type="button"
                            onClick={goToNextStep}
                            className="responsive-success-button"
                            text="Confirmar pedido" />
                        : ''
                    }
                    {responsiveStep === 6
                        ? <SucessButtonComponent
                            type="button"
                            onClick={goToNextStep}
                            className="responsive-success-button"
                            text="Ver status do pedido" />
                        : ''
                    } */}
                </div>
                : <div className="action-button-row">
                    <SucessButtonComponent
                        type="submit"
                        text="Confirmar dados" />
                </div>
            }
        </StyledSaveOrderForm>
    )
}

const mapStateToProps = store => ({
    cardStep: store.orderState.cardStep,
    scheduleValidations: store.orderState.scheduleValidations,
    addressValidations: store.orderState.addressValidations,
    cardValidations: store.orderState.cardValidations,
    responsiveStep: store.orderState.responsiveStep,
    userInfo: store.authState.userInfo,
    products: store.cartState.products,
    token: store.authState.token,
})

export default connect(mapStateToProps)(SaveOrderStepper);
