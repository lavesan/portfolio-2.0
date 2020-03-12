import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledSaveOrderStepper } from './save-order-stepper.styles';
import { setStep, sumStep } from '../../../store/actions/orderActions';
import { OrderFirstStepForm } from '../order-first-step-form';
import { OrderSecondStepForm } from '../order-second-step-form';

const SaveOrderStepper = ({ className, activeStep, dispatch }) => {

    const setActualStep = step => {
        dispatch(setStep(step));
    }

    const changeStep = (next) => {
        dispatch(sumStep(next));
    }

    const onClickNext = () => {
        changeStep(true);
    }

    const onClickBack = () => {
        changeStep(false);
    }
    
    const steps = [
        OrderFirstStepForm,
        OrderSecondStepForm,
        OrderFirstStepForm,
    ]

    const FormComponent = useMemo(
        () => {
            return steps[activeStep - 1];
        },
        [activeStep]
    )

    return (
        <StyledSaveOrderStepper className={className}>
            <div className="stepper-header">
                <div className={`circle ${activeStep >= 1 ? 'active' : ''}`} onClick={() => setActualStep(1)}>1</div>
                <div className="line">
                    <div className={activeStep >= 2 ? 'next-step-animation-line' : ''}></div>
                </div>
                <div className={`circle ${activeStep >= 2 ? 'active' : ''}`} onClick={() => setActualStep(2)}>2</div>
                <div className="line">
                    <div className={activeStep >= 3 ? 'next-step-animation-line' : ''}></div>
                </div>
                <div className={`circle ${activeStep >= 3 ? 'active' : ''}`} onClick={() => setActualStep(3)}>3</div>
            </div>
            <div className="stepper-form">
                <FormComponent />
            </div>
        </StyledSaveOrderStepper>
    )
}

const mapStateToProps = store => ({
    activeStep: store.orderState.activeStep,
})

export default connect(mapStateToProps)(SaveOrderStepper);
