import React from 'react';
import { connect } from 'react-redux';

import { StyledOrderSecondStepForm } from './order-second-step-form.styles';
import { FormFieldComponent } from '../../../../components/form/form-field';
import { StyledButtonFormEnd } from '../../../../components/form/form-button-field';
import { setCardStepValues } from '../../../../store/actions/orderActions';
import { StyledSuccessButton } from '../../../../components/button';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';

const OrderSecondStepForm = ({ dispatch, cardStep }) => {

    const setFieldValue = (name, value) => {
        dispatch(setCardStepValues({ name, value }))
    }

    return (
        <StyledOrderSecondStepForm>
            <StyledOrderFormTitle>Selecione o método de pagamento</StyledOrderFormTitle>
            <FormFieldComponent
                label="CPF/CNPJ"
                name="cpf"
                value={cardStep.cpf}
                placeholder="Digite seu CPF"
                setFieldValue={setFieldValue} />
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
            {/* <StyledButtonFormEnd>
                <StyledSuccessButton type="submit">Avançar</StyledSuccessButton>
            </StyledButtonFormEnd> */}
        </StyledOrderSecondStepForm>
    )
}

const mapStateToProps = store => ({
    cardStep: store.orderState.cardStep,
})

export default connect(mapStateToProps)(OrderSecondStepForm);
