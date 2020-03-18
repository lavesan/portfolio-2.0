import React from 'react';
import { connect } from 'react-redux';

import { setAddressStepValues } from '../../store/actions/orderActions';
import { StyledOrderAddressStepForm } from './order-address-step-form.styles';
import { FormFieldComponent } from '../form/form-field';
import { FormTextareaComponent } from '../form/form-textarea';
import { StyledButtonFormEnd } from '../form/form-button-field';
import { StyledSuccessButton } from '../button';

const OrderAddressStepForm = ({ dispatch, addressStep }) => {

    const setFieldValue = (name, value) => {
        dispatch(setAddressStepValues({ name, value }));
    }

    const onSubmit = element => {

        element.preventDefault();

        console.log('addressStep: ', addressStep);

    }

    return (
        <StyledOrderAddressStepForm onSubmit={onSubmit}>
            <div className="first-row">
                <FormFieldComponent
                    label="CEP"
                    name="cep"
                    value={addressStep.cep}
                    className="first-column"
                    placeholder="00000-000"
                    setFieldValue={setFieldValue} />
                <FormFieldComponent
                    label="Bairro"
                    name="district"
                    value={addressStep.district}
                    className="second-column"
                    placeholder="00000-000"
                    setFieldValue={setFieldValue} />
            </div>
            <div className="second-row">
                <FormFieldComponent
                    label="Endereço"
                    name="address"
                    value={addressStep.address}
                    className="first-column"
                    placeholder="00000-000"
                    setFieldValue={setFieldValue} />
                <FormFieldComponent
                    label="Número"
                    name="number"
                    value={addressStep.number}
                    className="second-column"
                    placeholder="00000-000"
                    setFieldValue={setFieldValue} />
            </div>
            <div>
                <FormTextareaComponent
                    label="Observações"
                    name="complement"
                    legend="Se o seu enreço for de difícil acesso, por favor, nos forneça mais informações para que o Seu China, nosso entregador, consiga realizar a entrega :)"
                    value={addressStep.complement}
                    className="second-column"
                    placeholder="00000-000"
                    setFieldValue={setFieldValue} />
            </div>
            <StyledButtonFormEnd>
                <StyledSuccessButton type="submit">Finalizar</StyledSuccessButton>
            </StyledButtonFormEnd>
        </StyledOrderAddressStepForm>
    )

}

const mapStateToProps = store => ({
    addressStep: store.orderState.addressStep,
})

export default connect(mapStateToProps)(OrderAddressStepForm);
