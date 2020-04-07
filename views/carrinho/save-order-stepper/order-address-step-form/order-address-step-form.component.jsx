import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { setAddressStepValues, setAllAddressStepValues, clearAddressStepValues } from '../../../../store/actions/orderActions';
import { StyledOrderAddressStepForm, StyledAddressInfoRadio } from './order-address-step-form.styles';
import { FormFieldComponent } from '../../../../components/form/form-field';
import { FormTextareaComponent } from '../../../../components/form/form-textarea';
import { StyledButtonFormEnd } from '../../../../components/form/form-button-field';
import { StyledSuccessButton } from '../../../../components/button';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';
import { setAddressValidation } from '../../../../store/actions/orderActions';
import { isRequired, validateOnlyNumber, isCellphoneNumber } from '../../../../helpers/validations.helpers';
import { onlyNumberMask, onlyCharactersMask, celphoneMask } from '../../../../helpers/mask.helpers';
import { FormRadioComponent } from '../../../../components/form/form-radio';
import { FormCheckboxComponent } from '../../../../components/form/form-checkbox';
import { FormOrderSelectComponent } from '../../../../components/form/form-order-select';
import { numberToReal } from '../../../../helpers/calc.helpers';
import { priceByDistrictOpts, priceByDistrict } from '../../../../helpers/order.helpers';
import { unmaskDistrictName } from '../../../../helpers/unmask.helpers';
import { removeDiacritics } from '../../../../helpers/removespecialCharacter.helpers';
import { authInstance } from '../../../../services/auth.service';
import { setManyValuesAddress } from '../../../../store/actions/orderActions';

const OrderAddressStepForm = ({ dispatch, addressStep, addressValidations, userInfo, token, submitted }) => {

    const authService = authInstance.getInstance();

    const { addToast } = useToasts();

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const setFormValidations = (validation) => {
        dispatch(setAddressValidation(validation));
    }

    const setFieldValue = (name, value) => {
        dispatch(setAddressStepValues({ name, value }));
    }

    const chooseAddress = (name, values) => {
        if (!values.value.id) {
            dispatch(clearAddressStepValues());
        } else {
            dispatch(setAllAddressStepValues(values.value));
        }
    }

    const AddressInfoRadio = ({ address, cep, district, complement, number }) => {
        return (
            <StyledAddressInfoRadio>
                <p className="address-title">{address}, {number}</p>
                <p className="middle-text">CEP {cep}, {district}</p>
                <p>{complement}</p>
            </StyledAddressInfoRadio>
        )
    }

    const searchCep = () => {

        authService.findCep(addressStep.cep)
            .then(({ data }) => {

                const formatedDistrict = unmaskDistrictName(removeDiacritics(data.bairro));

                if (priceByDistrictOpts.some(f => f.label == formatedDistrict)) {
                    showToast('Não fazemos entregas neste bairro :(');
                    return;
                } else {
                    const selectedDistrict = {
                        label: data.bairro,
                        value: priceByDistrict[formatedDistrict],
                    };
    
                    dispatch(setManyValuesAddress({
                        address: data.logradouro,
                        complement: data.complemento,
                        district: selectedDistrict,
                    }));
                }

            })
            .catch(err => {
                showToast('Não achamos seu endereço pelo CEP.');
            });

    }

    const allAddressesSelect = useMemo(
        () => {

            const mappedAddresses = userInfo.addresses.map(address => {
                return {
                    label: <AddressInfoRadio {...address} />,
                    value: address,
                }
            });

            return [
                ...mappedAddresses,
                {
                    label: <p>Adicionar novo endereço</p>,
                    value: { id: '' },
                },
            ]

        },
        [userInfo]
    )

    useEffect(() => {
        if (userInfo.addresses.length) {
            dispatch(setAllAddressStepValues(userInfo.addresses[0]));
        }
    }, []);

    return (
        <StyledOrderAddressStepForm>
            <StyledOrderFormTitle>Informações gerais</StyledOrderFormTitle>
            <div className="first-row">
                {!token &&
                    <FormFieldComponent
                        label="Seu nome"
                        name="userName"
                        className="first-column"
                        placeholder="Seu nome aqui"
                        startValidations={submitted}
                        maskOnChange={onlyCharactersMask}
                        value={addressStep.userName}
                        className="first-column"
                        setFieldValue={setFieldValue} />
                }
                {!userInfo.contacts.length
                    ? <FormFieldComponent
                        className="second-column"
                        label="Telefone para contato"
                        name="phoneNumber"
                        placeholder="(99) 99999-9999"
                        startValidations={submitted}
                        maskOnChange={celphoneMask}
                        validatesOnChange={[isRequired, isCellphoneNumber]}
                        setFormValidations={setFormValidations}
                        formValidation={addressValidations.phoneNumber}
                        value={addressStep.phoneNumber}
                        className="first-column"
                        setFieldValue={setFieldValue} />
                    : ''
                }
            </div>
            {userInfo.addresses.length ?
                <FormRadioComponent
                    value={addressStep.id}
                    setFieldValue={chooseAddress}
                    radios={allAddressesSelect}
                    selectedId={addressStep.id} /> : ''
            }
            {!addressStep.id &&
                <>
                    <div className="first-row">
                        <FormFieldComponent
                            label="CEP"
                            name="cep"
                            onFocusOut={searchCep}
                            startValidations={submitted}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={addressValidations.cep}
                            value={addressStep.cep}
                            className="first-column"
                            setFieldValue={setFieldValue} />
                        <FormOrderSelectComponent
                            label="Bairro"
                            name="district"
                            placeholder="Ser bairro aqui"
                            startValidations={submitted}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={addressValidations.district}
                            value={addressStep.district}
                            className="second-column"
                            setFieldValue={setFieldValue}
                            options={priceByDistrictOpts} />
                    </div>
                    <div className="second-row">
                        <FormFieldComponent
                            label="Endereço"
                            name="address"
                            startValidations={submitted}
                            maskOnChange={onlyCharactersMask}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={addressValidations.address}
                            value={addressStep.address}
                            className="first-column"
                            setFieldValue={setFieldValue} />
                        <FormFieldComponent
                            label="Número"
                            name="number"
                            startValidations={submitted}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={addressValidations.number}
                            value={addressStep.number}
                            className="second-column"
                            setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        <FormTextareaComponent
                            label="Observações"
                            name="complement"
                            legend="Se o seu endereço for de difícil acesso, por favor, nos forneça mais informações para que Marcone e Felipe, nossos entregadores, consigam realizar a entrega :)"
                            value={addressStep.complement}
                            className="second-column"
                            setFieldValue={setFieldValue} />
                    </div>
                    <div className="address-last-row">
                        {token &&
                            <FormCheckboxComponent
                                label={<label className="order-checkbox-label">Salvar como novo endereço</label>}
                                name="saveAddress"
                                value={addressStep.saveAddress}
                                onChange={setFieldValue} />
                        }
                        {addressStep.district &&
                            <p className="freight-value-container">
                                Valor do frete: {numberToReal(addressStep.district.value)}
                            </p>
                        }
                    </div>
                </>
            }
        </StyledOrderAddressStepForm>
    )

}

const mapStateToProps = store => ({
    addressStep: store.orderState.addressStep,
    addressValidations: store.orderState.addressValidations,
    userInfo: store.authState.userInfo,
    token: store.authState.token,
})

export default connect(mapStateToProps)(OrderAddressStepForm);
