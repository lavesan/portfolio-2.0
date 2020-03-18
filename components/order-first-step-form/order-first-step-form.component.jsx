import React from 'react';
import { connect } from 'react-redux';

import { setUserStepValues } from '../../store/actions/orderActions';
import { StyledOrderFirstStep } from './order-first-step-form.styles';
import { FormFieldComponent } from '../form/form-field';
import { FormRadioComponent } from '../form/form-radio';
import { StyledButtonFormEnd } from '../form/form-button-field';
import { StyledSuccessButton } from '../button';

const OrderFirstStep = ({ dispatch, userStep, onClickNext }) => {

    const setFieldValue = (name, value) => {
        dispatch(setUserStepValues({ name, value }))
    }

    const onSubmit = (element) => {

        element.preventDefault();

        console.log('userStep: ', userStep);

        onClickNext();

    }

    return (
        <StyledOrderFirstStep onSubmit={onSubmit}>
            <h2>Preencha com suas informações</h2>
            <div>
                <label>Qual a forma de pagamento?</label>
                <div className="payment-type-container">
                    <FormRadioComponent
                        label="Cartão de crédito"
                        id="credit"
                        value={1}
                        selectValue={userStep.paymentType}
                        name="paymentType"
                        setFieldValue={setFieldValue} />
                    <FormRadioComponent
                        label="Cartão de débito"
                        id="debit"
                        value={2}
                        selectValue={userStep.paymentType}
                        name="paymentType"
                        setFieldValue={setFieldValue} />
                    <FormRadioComponent
                        label="Dinheiro"
                        id="money"
                        value={0}
                        selectValue={userStep.paymentType}
                        name="paymentType"
                        setFieldValue={setFieldValue} />
                </div>
            </div>
            <FormFieldComponent
                label="CPF/CNPJ"
                name="cpf"
                value={userStep.cpf}
                placeholder="Digite seu CPF"
                setFieldValue={setFieldValue} />
            <StyledButtonFormEnd>
                <StyledSuccessButton type="submit">Avançar</StyledSuccessButton>
            </StyledButtonFormEnd>
        </StyledOrderFirstStep>
    )

}

const mapStateToProps = store => ({
    userStep: store.orderState.userStep,
})

export default connect(mapStateToProps)(OrderFirstStep);
