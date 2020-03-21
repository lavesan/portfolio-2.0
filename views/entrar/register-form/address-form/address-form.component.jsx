import React from 'react';

import { onlyCharactersMask, onlyNumberMask } from '../../../../helpers/mask.helpers';
import { validateOnlyNumber, isRequired } from '../../../../helpers/validations.helpers';
import { StyledSuccessButton } from '../../../../components/button';
import { StyledAddressForm } from './address-form.styles';
import { FormTextMaterial } from '../../../../components/form/form-text-material';
import { StyledFormTitle } from '../register-form.styles';

export default ({ setFormValidations, formValidations, setFieldValue, values }) => {

    return (
        <StyledAddressForm>
            <StyledFormTitle>
                <h2>Endereço</h2>
                <p className="section-description">Informe detalhadamente seu endereço para fazermos a melhor entrega possível</p>
            </StyledFormTitle>
            <div className="row">
                <div className="w-60">
                    <FormTextMaterial
                        label="Seu CEP"
                        name="cep"
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        validatesOnChange={[isRequired, validateOnlyNumber]}
                        maskOnChange={onlyNumberMask}
                        value={values.cep}
                        onChange={setFieldValue} />
                </div>
                <div className="w-30">
                    <StyledSuccessButton style={{ width: '100%', padding: '10px 0' }}>
                        Pesquisar
                    </StyledSuccessButton>
                </div>
            </div>
            <div className="row">
                <div className="w-60">
                    <FormTextMaterial
                        label="Rua"
                        name="address"
                        validatesOnChange={[isRequired]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        value={values.address}
                        onChange={setFieldValue} />
                </div>
                <div className="w-30">
                    <FormTextMaterial
                        label="Número"
                        name="number"
                        validatesOnChange={[isRequired, validateOnlyNumber]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        maskOnChange={onlyNumberMask}
                        value={values.number}
                        onChange={setFieldValue} />
                </div>
            </div>
            <div className="row">
                <FormTextMaterial
                    label="Bairro"
                    name="district"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired]}
                    maskOnChange={onlyCharactersMask}
                    value={values.district}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Complemento"
                    name="complement"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired]}
                    value={values.complement}
                    onChange={setFieldValue} />
            </div>
            <FormTextMaterial
                label="Descrição"
                name="type"
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired]}
                value={values.type}
                onChange={setFieldValue} />
        </StyledAddressForm>
    )

}
