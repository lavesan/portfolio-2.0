import React, { useState } from 'react';
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
import { cepMask } from '../../../../helpers/mask.helpers';
import { validateCep } from '../../../../helpers/validations.helpers';
import { setAddressFormValidations } from '../../../../store/actions/authActions';

const AddressFormComponent = ({ addressFormValidations, addressRegisterForm, isResponsive, startValidations, dispatch }) => {

    const authService = authInstance.getInstance();
    
    const { addToast } = useToasts();

    const [loadingCep, setLoadingCep] = useState(false);

    const setFormValidations = (func) => {

        const validations = func(addressFormValidations);
        dispatch(setAddressFormValidations(validations));

    }

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

    const searchCep = async () => {

        setLoadingCep(true);
        await authService.findCep(addressRegisterForm.cep.replace(/\D/g, ''))
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
                console.log('window.navigator.onLine: ', window.navigator.onLine)
                if (window.navigator.onLine) {
                    showToast('Não achamos seu endereço pelo CEP.');
                } else {
                    showToast('Você está offline');
                }
            });
        setLoadingCep(false);

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
                        formValidations={addressFormValidations}
                        setFormValidations={setFormValidations}
                        validatesOnChange={[isRequired, validateCep]}
                        maskOnChange={cepMask}
                        value={addressRegisterForm.cep}
                        onChange={setFieldValue} />
                </div>
                <div className="w-30 search-button-container">
                    <StyledFullRevSuccessButton
                        type="button"
                        disabled={loadingCep ? 'true' : ''}
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
                        formValidations={addressFormValidations}
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
                        formValidations={addressFormValidations}
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
                    validatesOnChange={[isRequired]}
                    formValidations={addressFormValidations}
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
                label="Favoritar como"
                name="type"
                startValidations={startValidations}
                formValidations={addressFormValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired]}
                value={addressRegisterForm.type}
                onChange={setFieldValue} />
        </StyledAddressForm>
    )

}

const mapStateToProps = store => ({
    addressRegisterForm: store.authState.addressRegisterForm,
    addressFormValidations: store.authState.addressFormValidations,
})

export default connect(mapStateToProps)(AddressFormComponent);
