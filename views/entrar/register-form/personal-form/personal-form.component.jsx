import React from 'react';
import { connect } from 'react-redux';

import { StyledFormTitle } from '../register-form.styles';
import { StyledPersonalForm } from './personal-form.styles';
import { maxLengthMask, onlyNumberMask } from '../../../../helpers/mask.helpers';
import { isRequired, notNullable, validateOnlyNumber } from '../../../../helpers/validations.helpers';
import { FormTextMaterial } from '../../../../components/form/form-text-material';
import { FormSelectComponent } from '../../../../components/form/form-select';
import { userRoleOpts, userGenderOpts } from '../../../../helpers/register.helpers';
import { setRegisterFormPersonalValue } from '../../../../store/actions/authActions';

const PersonalFormComponent = ({ setFormValidations, formValidations, personalRegisterForm, isResponsive, startValidations, dispatch }) => {
    
    const ageMask = value => {
        const onlyNumber = onlyNumberMask(value);
        return maxLengthMask(onlyNumber, 3);
    }

    const setFieldValue = (name, value) => {
        dispatch(setRegisterFormPersonalValue({
            name,
            value,
        }));
    }

    return (
        <StyledPersonalForm isResponsive={isResponsive}>
            <StyledFormTitle isResponsive={isResponsive}>
                <h2>Informações pessoais</h2>
                <p className="section-description">Para personalizarmos suas promoções</p>
            </StyledFormTitle>
            <div className="row">
                <div className="w-60">
                    <FormSelectComponent
                        label="Gênero"
                        name="gender"
                        startValidations={startValidations}
                        validatesOnChange={[notNullable]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        value={personalRegisterForm.gender}
                        onChange={setFieldValue}
                        options={userGenderOpts} />
                </div>
                <div className="w-30">
                    <FormTextMaterial
                        label="Idade"
                        name="age"
                        startValidations={startValidations}
                        validatesOnChange={[isRequired, validateOnlyNumber]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        maskOnChange={ageMask}
                        value={personalRegisterForm.age}
                        onChange={setFieldValue} />
                </div>
            </div>
            <div className="row">
                <FormTextMaterial
                    className="w-50"
                    label="Quant. de animais"
                    name="animalsQuantity"
                    startValidations={startValidations}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    maskOnChange={onlyNumberMask}
                    value={personalRegisterForm.animalsQuantity}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    className="w-50"
                    label="Quant. de crianças"
                    name="childrensQuantity"
                    startValidations={startValidations}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    maskOnChange={onlyNumberMask}
                    value={personalRegisterForm.childrensQuantity}
                    onChange={setFieldValue} />
            </div>
            <div className="w-80">
                <FormSelectComponent
                    label="Seu papel"
                    name="role"
                    startValidations={startValidations}
                    validatesOnChange={[notNullable]}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={personalRegisterForm.role}
                    onChange={setFieldValue}
                    options={userRoleOpts} />
            </div>
            <FormTextMaterial
                label="Bio"
                placeholder="Fale um pouco sobre você"
                name="description"
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                value={personalRegisterForm.description}
                onChange={setFieldValue} />
        </StyledPersonalForm>
    )

}

const mapStateToProps = store => ({
    personalRegisterForm: store.authState.personalRegisterForm,
})

export default connect(mapStateToProps)(PersonalFormComponent);
