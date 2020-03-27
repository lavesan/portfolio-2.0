import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { setAddressStepValues, setAllAddressStepValues, clearAddressStepValues } from '../../../../store/actions/orderActions';
import { StyledOrderAddressStepForm, StyledAddressInfoRadio } from './order-address-step-form.styles';
import { FormFieldComponent } from '../../../../components/form/form-field';
import { FormTextareaComponent } from '../../../../components/form/form-textarea';
import { StyledButtonFormEnd } from '../../../../components/form/form-button-field';
import { StyledSuccessButton } from '../../../../components/button';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';
import { setAddressValidation } from '../../../../store/actions/orderActions';
import { isRequired, validateOnlyNumber } from '../../../../helpers/validations.helpers';
import { onlyNumberMask, onlyCharactersMask } from '../../../../helpers/mask.helpers';
import { FormRadioComponent } from '../../../../components/form/form-radio';
import { FormCheckboxComponent } from '../../../../components/form/form-checkbox';
import { FormOrderSelectComponent } from '../../../../components/form/form-order-select';
import { priceByDistrictOpts } from '../../../../helpers/order.helpers';

const OrderAddressStepForm = ({ dispatch, addressStep, addressValidations, userInfo, token }) => {

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
            <StyledOrderFormTitle>Seu endereço</StyledOrderFormTitle>
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
                            legend="Se o seu endereço for de difícil acesso, por favor, nos forneça mais informações para que o Seu China, nosso entregador, consiga realizar a entrega :)"
                            value={addressStep.complement}
                            className="second-column"
                            setFieldValue={setFieldValue} />
                    </div>
                    {token &&
                        <FormCheckboxComponent
                            label={<label className="order-checkbox-label">Salvar como novo endereço</label>}
                            name="saveAddress"
                            value={addressStep.saveAddress}
                            onChange={setFieldValue} />
                    }
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
