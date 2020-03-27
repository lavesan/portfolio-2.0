import React, { useState } from 'react';
import { connect } from 'react-redux';

import { StyledSaveOrderForm } from './save-order-stepper.styles';
import { OrderAddressStepForm } from './order-address-step-form';
import { SchedulerStepFormComponent } from './scheduler-step-form';
import { OrderCardStepForm } from './order-second-step-form';
import { orderInstance } from '../../../services/order.service';
import { SucessButtonComponent } from '../../../components/button';

const SaveOrderStepper = ({ className, scheduleStep, cardStep, addressStep, dispatch }) => {

    const orderService = orderInstance.getInstance();

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setSubmitted(true);
        // await orderService.save(body)
        //     .then(res => {
        //         console.log('resposta: ', res);
        //     })
        //     .catch(err => {
        //         console.log('erro: ', err);
        //     })

        console.log('scheduleStep: ', scheduleStep);
        console.log('addressStep: ', addressStep);
        console.log('cardStep: ', cardStep);

        setLoading(false);

    }

    return (
        <StyledSaveOrderForm className={className} onSubmit={onSubmit}>
            <OrderAddressStepForm submitted={submitted} />
            <SchedulerStepFormComponent submitted={submitted} />
            <OrderCardStepForm submitted={submitted} />
            <div className="action-button-row">
                <SucessButtonComponent
                    type="submit"
                    text="Confirmar dados"
                    loading={loading} />
            </div>
        </StyledSaveOrderForm>
    )
}

const mapStateToProps = store => ({
    scheduleStep: store.orderState.scheduleStep,
    cardStep: store.orderState.cardStep,
    addressStep: store.orderState.addressStep,
    userInfo: store.authState.userInfo,
})

export default connect(mapStateToProps)(SaveOrderStepper);
