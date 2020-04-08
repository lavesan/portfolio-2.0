import React, { useState, useMemo, useEffect } from 'react';
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

const SaveOrderStepper = ({ className, cardStep, dispatch, products, addressValidations, scheduleValidations, cardValidations, token, isResponsive, responsiveStep, userInfo, addressStep }) => {

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
        
        let cardStepValidate = cardStep.payLatter
            ? ['paymentType', 'cpf', 'paymentoMethod', 'changeValueCents']
            : ['paymentType', 'cpf', 'paymentoMethod', 'cvv', 'fullname', 'dueDate', 'brand'];

        if (token && cardStep.id && !cardStep.payLatter) {
            return false;
        }

        return cardStepValidate.some(value => cardValidations[value] && cardValidations[value].invalid);

    }

    const addressStepInvalid = () => {
        
        let addressStepValidate = token
            ? ['id', 'cep', 'district', 'address', 'number', 'complement']
            : ['id', 'cep', 'district', 'address', 'number', 'complement', 'phoneNumber', 'userName'];

        if (token && !userInfo.contacts.length) {
            addressStepValidate.push('phoneNumber');
        }

        if (token && addressStep.id) {
            addressStepValidate = ['phoneNumber'];
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

        const invalidProduct = validateProducts();

        if (invalidProduct)
            return invalidProduct;

        const invalidForm = cardStepInvalid() || addressStepInvalid() || scheduleStepInvalid();

        if (invalidForm) {
            showToast('Parece que você deixou algum campo inválido. Por favor verifique-os.');
        }

        return invalidForm;
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
        
        // Navigates to the top of the page
        const link = document.getElementById('click-link-page-top');
        if (link) {
            link.click();
        }
        
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

        if (!isResponsive) {
            dispatch(toogleAddOrderCommentModal());
        }

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
        [responsiveStep, submittedStep]
    )

    useEffect(() => {
        const link = document.getElementById('click-link-page-top');
        if (link) {
            link.click();
        }
    }, [])

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
                    {responsiveStep <= 3
                        ? <SucessButtonComponent
                            type="button"
                            onClick={goToNextStep}
                            className="responsive-success-button"
                            text="Avançar" />
                        : ''
                    }
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
    addressStep: store.orderState.addressStep,
    scheduleValidations: store.orderState.scheduleValidations,
    addressValidations: store.orderState.addressValidations,
    cardValidations: store.orderState.cardValidations,
    responsiveStep: store.orderState.responsiveStep,
    userInfo: store.authState.userInfo,
    products: store.cartState.products,
    token: store.authState.token,
})

export default connect(mapStateToProps)(SaveOrderStepper);
