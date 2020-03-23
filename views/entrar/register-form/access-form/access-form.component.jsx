import React from 'react';
import { connect } from 'react-redux';

import { cpfMask, onlyCharactersMask } from '../../../../helpers/mask.helpers';
import { isRequired, validateCpf, validateEmail, isEqualTo, minLength, isRequireTrue } from '../../../../helpers/validations.helpers';
import { toggleTermOfContractModal } from '../../../../store/actions/modalActions';
import { setRegisterFormAccessValue } from '../../../../store/actions/authActions';
import { StyledFormTitle } from '../register-form.styles';
import { StyledAcessForm } from './access-form.styles';
import { FormTextMaterial } from '../../../../components/form/form-text-material';
import { FormCheckboxComponent } from '../../../../components/form/form-checkbox';

const AcessForm = ({ setFormValidations, formValidations, dispatch, accessRegisterForm, isResponsive, startValidations }) => {

    const toggleTermContractModal = () => {
        dispatch(toggleTermOfContractModal());
    }

    const setFieldValue = (name, value) => {
        dispatch(setRegisterFormAccessValue({
            name,
            value,
        }));
    }

    const validatePassword = (value1) => {
        return isEqualTo(value1, accessRegisterForm.password, 'As senhas devem ser iguais.');
    }
    
    const validateMinFive = value => {
        return minLength(value, 5);
    }

    return (
        <StyledAcessForm isResponsive={isResponsive}>
            <StyledFormTitle isResponsive={isResponsive}>
                <h2>Email e senha</h2>
                <p className="section-description">Iremos te mandar informações de compra por lá</p>
            </StyledFormTitle>
            <div className="row">
                <FormTextMaterial
                    label="Nome"
                    name="name"
                    maskOnChange={onlyCharactersMask}
                    startValidations={startValidations}
                    formValidations={formValidations}
                    value={accessRegisterForm.name}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired]}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Digite seu CPF"
                    name="cpf"
                    startValidations={startValidations}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    validatesOnChange={[isRequired, validateCpf]}
                    maskOnChange={cpfMask}
                    value={accessRegisterForm.cpf}
                    onChange={setFieldValue} />
            </div>
            <FormTextMaterial
                label="Insira seu melhor e-mail"
                name="email"
                startValidations={startValidations}
                formValidations={formValidations}
                value={accessRegisterForm.email}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired, validateEmail]}
                onChange={setFieldValue} />
            <FormTextMaterial
                label="Crie uma senha"
                name="password"
                type="password"
                startValidations={startValidations}
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired, validateMinFive]}
                value={accessRegisterForm.password}
                onChange={setFieldValue} />
            <FormTextMaterial
                label="Confirme sua senha"
                name="confirmPassword"
                type="password"
                startValidations={startValidations}
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired, validateMinFive, validatePassword]}
                value={accessRegisterForm.confirmPassword}
                onChange={setFieldValue} />
            <FormCheckboxComponent
                label={<label className="contract-term-label">Li e aceito os <a className="contract-term-link" onClick={toggleTermContractModal}>termos de contrato</a></label>}
                name="termOfContract"
                style={{
                    marginBottom: 18,
                }}
                validatesOnChange={[isRequireTrue]}
                startValidations={startValidations}
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                value={accessRegisterForm.termOfContract}
                onChange={setFieldValue} />
        </StyledAcessForm>
    )

}

const mapStateToProps = store => ({
    accessRegisterForm: store.authState.accessRegisterForm,
})

export default connect(mapStateToProps)(AcessForm);
