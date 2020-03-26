import React from 'react';
import { connect } from 'react-redux';

import { StyledSaveOrderForm } from './save-order-stepper.styles';
import { OrderAddressStepForm } from './order-address-step-form';
import { SchedulerStepFormComponent } from './scheduler-step-form';
import { OrderCardStepForm } from './order-second-step-form';
import { orderInstance } from '../../../services/order.service';

const SaveOrderStepper = ({ className, scheduleStep, cardStep, addressStep, dispatch }) => {

    const orderService = orderInstance.getInstance();

    const onSubmit = (e) => {

        e.preventDefault();

        console.log('scheduleStep: ', scheduleStep);
        console.log('addressStep: ', addressStep);
        console.log('cardStep: ', cardStep);

    }

    return (
        <StyledSaveOrderForm className={className} onSubmit={onSubmit}>
            <OrderAddressStepForm />
            <SchedulerStepFormComponent />
            <OrderCardStepForm />
        </StyledSaveOrderForm>
    )
}

const mapStateToProps = store => ({
    scheduleStep: store.orderState.scheduleStep,
    cardStep: store.orderState.cardStep,
    addressStep: store.orderState.addressStep,
})

export default connect(mapStateToProps)(SaveOrderStepper);
