import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setRegisterFormValues } from '../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { FormTextMaterial } from '../form/form-text-material';
import { FormTextareaMaterial } from '../form/form-textarea-material';
import { FormCheckboxComponent } from '../form/form-checkbox';
import { FormSelectComponent } from '../form/form-select';
import { userRoleOpts, userGenderOpts } from '../../helpers/register.helpers';
import { toggleTermOfContractModal } from '../../store/actions/modalActions';
import { StyledSuccessButton } from '../button';
import { onlyCharactersMask, maxLengthMask, cpfMask, onlyNumberMask } from '../../helpers/mask.helpers';
import { validateOnlyNumber, isRequired, validateCpf, validateEmail, maxValue, isEqualTo, minLength } from '../../helpers/validations.helpers';

const RegisterFormComponent = ({ dispatch, registerForm }) => {

    const setFieldValue = (name, value) => {

        dispatch(setRegisterFormValues({
            name,
            value,
        }));

    }

    const toggleTermContractModal = () => {
        dispatch(toggleTermOfContractModal());
    }

    const [formValidations, setFormValidations] = useState({});

    const onSubmit = (e) => {

        e.preventDefault();

        const validations = Object.values(formValidations);
        if (validations.some(validation => validation.invalid)) {
            console.log('campos inválidos')
            return;
        }

    }

    const ageMask = value => {
        const onlyNumber = onlyNumberMask(value);
        return maxLengthMask(onlyNumber, 3);
    }

    const validateMinFive = value => {
        return minLength(value, 5);
    }

    const validatePassword = (value1, name) => {
        const value2 = name === 'confirmPassword' ? registerForm.password : registerForm.confirmPassword;
        return isEqualTo(value1, value2, 'As senhas devem ser iguais.');
    }

    return (
        <StyledRegisterForm onSubmit={onSubmit}>
            <div className="credentials-form">
                <div className="section-title-container">
                    <h2>Email e senha</h2>
                    <p className="section-description">Iremos te mandar informações de compra por lá</p>
                </div>
                <FormTextMaterial
                    label="Insira seu melhor e-mail"
                    name="email"
                    formValidations={formValidations}
                    value={registerForm.email}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired, validateEmail]}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Crie uma senha"
                    name="password"
                    type="password"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired, validateMinFive, validatePassword]}
                    value={registerForm.password}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Confirme sua senha"
                    name="confirmPassword"
                    type="password"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired, validateMinFive, validatePassword]}
                    value={registerForm.confirmPassword}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Digite seu CPF"
                    name="cpf"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired, validateCpf]}
                    maskOnChange={cpfMask}
                    value={registerForm.cpf}
                    onChange={setFieldValue} />
                <FormCheckboxComponent
                    label={<label className="contract-term-label">Li e aceito os <a className="contract-term-link" onClick={toggleTermContractModal}>termos de contrato</a></label>}
                    name="termOfContract"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={registerForm.termOfContract}
                    onChange={setFieldValue} />
            </div>
            <div className="info-form">
                <div className="section-title-container">
                    <h2>Informações pessoais</h2>
                    <p className="section-description">Para personalizarmos suas promoções</p>
                </div>
                <FormSelectComponent
                    label="Gênero"
                    name="role"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={registerForm.role}
                    onChange={setFieldValue}
                    options={userGenderOpts} />
                <FormTextMaterial
                    label="Sua idade"
                    name="age"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    maskOnChange={ageMask}
                    value={registerForm.age}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Quant. de animais"
                    name="animalsQuantity"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    maskOnChange={onlyNumberMask}
                    value={registerForm.animalsQuantity}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Quant. de crianças"
                    name="childrensQuantity"
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    maskOnChange={onlyNumberMask}
                    value={registerForm.childrensQuantity}
                    onChange={setFieldValue} />
            </div>
            <div className="address-form">
                <div className="section-title-container">
                    <h2>Endereço</h2>
                    <p className="section-description">Informe detalhadamente seu endereço para fazermos a melhor entrega possível</p>
                </div>
                {/* <FormSelectComponent
                    label="Seu papel"
                    name="role"
                    value={registerForm.role}
                    onChange={setFieldValue}
                    options={userRoleOpts} /> */}
                <div className="row">
                    <div className="w-60">
                        <FormTextMaterial
                            label="Seu CEP"
                            name="cep"
                            formValidations={formValidations}
                            setFormValidations={setFormValidations}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            maskOnChange={onlyNumberMask}
                            value={registerForm.cep}
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
                            value={registerForm.address}
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
                            value={registerForm.number}
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
                        value={registerForm.district}
                        onChange={setFieldValue} />
                    <FormTextMaterial
                        label="Complemento"
                        name="complement"
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        validatesOnChange={[isRequired]}
                        value={registerForm.complement}
                        onChange={setFieldValue} />
                </div>
                {/* <FormTextareaMaterial
                    label="Descrição"
                    placeholder="Escreva uma breve descrição sua"
                    name="description"
                    errorMessage="No máximo 100 caracteres"
                    value={registerForm.description}
                    onChange={setFieldValue} /> */}
            </div>
        </StyledRegisterForm>
    )

}

const mapStateToProps = store => ({
    registerForm: store.authState.registerForm,
})

export default connect(mapStateToProps)(RegisterFormComponent);
