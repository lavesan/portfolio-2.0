import React from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { onlyNumberMask } from '../../../../helpers/mask.helpers';
import { validateOnlyNumber, isRequired, notNullable } from '../../../../helpers/validations.helpers';
import { districtOpts, districtNotValid } from '../../../../helpers/order.helpers';
import { removeDiacritics } from '../../../../helpers/removespecialCharacter.helpers';
import { StyledFullRevSuccessButton } from '../../../../components/button';
import { StyledAddressForm } from './address-form.styles';
import { FormTextMaterial } from '../../../../components/form/form-text-material';
import { FormSelectComponent } from '../../../../components/form/form-select';
import { StyledFormTitle } from '../register-form.styles';
import { authInstance } from '../../../../services/auth.service';
import { setRegisterFormAddressManyValues, setRegisterFormAddressValue } from '../../../../store/actions/authActions';

const AddressFormComponent = ({ setFormValidations, formValidations, addressRegisterForm, isResponsive, startValidations, dispatch }) => {

    const authService = authInstance.getInstance();
    
    const { addToast } = useToasts();
    
    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }
    
    const setFieldValue = (name, value) => {
        dispatch(setRegisterFormAddressValue({
            name,
            value,
        }));
    }

    const searchCep = () => {

        authService.findCep(addressRegisterForm.cep)
            .then(({ data }) => {

                if (districtNotValid(data.bairro)) {
                    showToast('Não fazemos entregas neste bairro :(');
                } else {
                    dispatch(setRegisterFormAddressManyValues({
                        address: data.logradouro,
                        complement: data.complemento,
                        district: removeDiacritics(data.bairro),
                    }));
                }

            })
            .catch(err => {
                showToast('Não achamos seu endereço pelo CEP.');
            });

    }

    return (
        <StyledAddressForm isResponsive={isResponsive}>
            <StyledFormTitle isResponsive={isResponsive}>
                <h2>Endereço</h2>
                <p className="section-description">Informe detalhadamente seu endereço para fazermos a melhor entrega possível</p>
            </StyledFormTitle>
            <div className="row">
                <div className="w-60">
                    <FormTextMaterial
                        label="Seu CEP"
                        name="cep"
                        startValidations={startValidations}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        validatesOnChange={[isRequired, validateOnlyNumber]}
                        maskOnChange={onlyNumberMask}
                        value={addressRegisterForm.cep}
                        onChange={setFieldValue} />
                </div>
                <div className="w-30 search-button-container">
                    <StyledFullRevSuccessButton
                        type="button"
                        notDense={isResponsive ? 'true' : ''}
                        onClick={searchCep}>
                        Pesquisar
                    </StyledFullRevSuccessButton>
                </div>
            </div>
            <div className="row">
                <div className="w-60">
                    <FormTextMaterial
                        label="Rua"
                        name="address"
                        startValidations={startValidations}
                        validatesOnChange={[isRequired]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        value={addressRegisterForm.address}
                        onChange={setFieldValue} />
                </div>
                <div className="w-30">
                    <FormTextMaterial
                        label="Número"
                        name="number"
                        startValidations={startValidations}
                        validatesOnChange={[isRequired, validateOnlyNumber]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        maskOnChange={onlyNumberMask}
                        value={addressRegisterForm.number}
                        onChange={setFieldValue} />
                </div>
            </div>
            <div className="row">
                <FormSelectComponent
                    label="Bairro"
                    name="district"
                    startValidations={startValidations}
                    validatesOnChange={[notNullable]}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={addressRegisterForm.district}
                    onChange={setFieldValue}
                    options={districtOpts} />
                <FormTextMaterial
                    label="Complemento"
                    name="complement"
                    value={addressRegisterForm.complement}
                    onChange={setFieldValue} />
            </div>
            <FormTextMaterial
                label="Descrição"
                name="type"
                startValidations={startValidations}
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired]}
                value={addressRegisterForm.type}
                onChange={setFieldValue} />
        </StyledAddressForm>
    )

}

const mapStateToProps = store => ({
    addressRegisterForm: store.authState.addressRegisterForm,
})

export default connect(mapStateToProps)(AddressFormComponent);
