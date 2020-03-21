import React from 'react';

import { StyledFormTitle } from '../register-form.styles';
import { StyledPersonalForm } from './personal-form.styles';
import { maxLengthMask, onlyNumberMask } from '../../../../helpers/mask.helpers';
import { isRequired } from '../../../../helpers/validations.helpers';
import { FormTextMaterial } from '../../../../components/form/form-text-material';
import { FormSelectComponent } from '../../../../components/form/form-select';
import { userRoleOpts, userGenderOpts } from '../../../../helpers/register.helpers';

export default ({ setFormValidations, formValidations, setFieldValue, values }) => {
    
    const ageMask = value => {
        const onlyNumber = onlyNumberMask(value);
        return maxLengthMask(onlyNumber, 3);
    }

    return (
        <StyledPersonalForm>
            <StyledFormTitle>
                <h2>Informações pessoais</h2>
                <p className="section-description">Para personalizarmos suas promoções</p>
            </StyledFormTitle>
            <div className="row">
                <div className="w-60">
                    <FormSelectComponent
                        label="Gênero"
                        name="gender"
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        value={values.gender}
                        onChange={setFieldValue}
                        options={userGenderOpts} />
                </div>
                <div className="w-30">
                    <FormTextMaterial
                        label="Idade"
                        name="age"
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        maskOnChange={ageMask}
                        value={values.age}
                        onChange={setFieldValue} />
                </div>
            </div>
            <div className="row">
                <div className="w-50">
                    <FormTextMaterial
                        label="Quant. de animais"
                        name="animalsQuantity"
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        maskOnChange={onlyNumberMask}
                        value={values.animalsQuantity}
                        onChange={setFieldValue} />
                </div>
                <div className="w-50">
                    <FormTextMaterial
                        label="Quant. de crianças"
                        name="childrensQuantity"
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        maskOnChange={onlyNumberMask}
                        value={values.childrensQuantity}
                        onChange={setFieldValue} />
                </div>
            </div>
            <div className="w-80">
                <FormSelectComponent
                    label="Seu papel"
                    name="role"
                    validatesOnChange={[isRequired]}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={values.role}
                    onChange={setFieldValue}
                    options={userRoleOpts} />
            </div>
            <FormTextMaterial
                label="Bio"
                placeholder="Fale um pouco sobre você"
                name="description"
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                value={values.childrensQuantity}
                onChange={setFieldValue} />
        </StyledPersonalForm>
    )

}
