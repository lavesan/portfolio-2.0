import React from 'react';
import { connect } from 'react-redux';

import { setFirstStepValues } from '../../../store/actions/orderActions';
import { StyledOrderFirstStep } from './order-first-step-form.styles';
import { FormFieldComponent } from '../../../components/form/form-field';
import { FormRadioComponent } from '../../../components/form/form-radio';
import { StyledSuccessButton } from '../../../components/button';

const OrderFirstStep = ({ dispatch, firstStep }) => {

    const setFieldValue = (name, value) => {
        dispatch(setFirstStepValues({ name, value }))
    }

    const onSubmit = (element) => {

        element.preventDefault();

        console.log('firstStep: ', firstStep);

    }

    return (
        <StyledOrderFirstStep onSubmit={onSubmit}>
            <h2>Preencha com suas informações</h2>
            <label>Qual a forma de pagamento?</label>
            <div className="payment-type-container">
                <FormRadioComponent
                   label="Cartão de crédito"
                   id="credit"
                   value="credit"
                   name="paymentType"
                   setFieldValue={setFieldValue} />
                <FormRadioComponent
                   label="Cartão de débito"
                   id="debit"
                   value="debit"
                   name="paymentType"
                   setFieldValue={setFieldValue} />
                <FormRadioComponent
                   label="Dinheiro"
                   id="money"
                   value="money"
                   name="paymentType"
                   setFieldValue={setFieldValue} />
            </div>
            <FormFieldComponent
                label="CPF/CNPJ"
                name="cpf"
                value={firstStep.cpf}
                placeholder="Digite seu CPF"
                setFieldValue={setFieldValue} />
            <StyledSuccessButton type="submit">Avançar</StyledSuccessButton>
        </StyledOrderFirstStep>
    )

}

const mapStateToProps = store => ({
    firstStep: store.orderState.firstStep,
})

export default connect(mapStateToProps)(OrderFirstStep);
