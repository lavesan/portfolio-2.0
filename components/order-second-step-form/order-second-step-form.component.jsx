import React from 'react';
import { connect } from 'react-redux';

import { StyledOrderSecondStepForm } from './order-second-step-form.styles';
import { FormFieldComponent } from '../form/form-field';
import { StyledButtonFormEnd } from '../form/form-button-field';
import { setCardStepValues } from '../../store/actions/orderActions';
import { StyledSuccessButton } from '../button';

const OrderSecondStepForm = ({ dispatch, cardStep, onClickNext }) => {

    const setFieldValue = (name, value) => {
        dispatch(setCardStepValues({ name, value }))
    }

    const onSubmit = (element) => {

        element.preventDefault();

        console.log('cardStep: ', cardStep);

        onClickNext();

    }

    return (
        <StyledOrderSecondStepForm onSubmit={onSubmit}>
            <div className="first-row">
                <FormFieldComponent
                    label="Número do cartão"
                    name="number"
                    value={cardStep.number}
                    className="first-column"
                    placeholder="00000-000"
                    setFieldValue={setFieldValue} />
                <FormFieldComponent
                    label="Vencimento"
                    name="dueDate"
                    value={cardStep.dueDate}
                    className="second-column"
                    placeholder="MM/AA"
                    setFieldValue={setFieldValue} />
            </div>
            <div className="second-row">
                <FormFieldComponent
                    label="Nome completo"
                    name="fullname"
                    value={cardStep.fullname}
                    className="first-column"
                    placeholder="Seu nome"
                    setFieldValue={setFieldValue} />
                <FormFieldComponent
                    label="CVV"
                    name="cvv"
                    value={cardStep.cvv}
                    className="second-column"
                    placeholder="000"
                    setFieldValue={setFieldValue} />
            </div>
            <StyledButtonFormEnd>
                <StyledSuccessButton type="submit">Avançar</StyledSuccessButton>
            </StyledButtonFormEnd>
        </StyledOrderSecondStepForm>
    )
}

const mapStateToProps = store => ({
    cardStep: store.orderState.cardStep,
})

export default connect(mapStateToProps)(OrderSecondStepForm);
