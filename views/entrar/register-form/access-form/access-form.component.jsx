import React from 'react';
import { connect } from 'react-redux';

import { cpfMask } from '../../../../helpers/mask.helpers';
import { isRequired, validateCpf, validateEmail, isEqualTo, minLength } from '../../../../helpers/validations.helpers';
import { toggleTermOfContractModal } from '../../../../store/actions/modalActions';
import { StyledFormTitle } from '../register-form.styles';
import { StyledAcessForm } from './access-form.styles';
import { FormTextMaterial } from '../../../../components/form/form-text-material';
import { FormCheckboxComponent } from '../../../../components/form/form-checkbox';

const AcessForm = ({ setFormValidations, formValidations, setFieldValue, dispatch, values }) => {

    const toggleTermContractModal = () => {
        dispatch(toggleTermOfContractModal());
    }

    const validatePassword = (value1, name) => {
        const value2 = name === 'confirmPassword' ? values.password : values.confirmPassword;
        return isEqualTo(value1, value2, 'As senhas devem ser iguais.');
    }
    
    const validateMinFive = value => {
        return minLength(value, 5);
    }

    return (
        <StyledAcessForm>
            <StyledFormTitle>
                <h2>Email e senha</h2>
                <p className="section-description">Iremos te mandar informações de compra por lá</p>
            </StyledFormTitle>
            <FormTextMaterial
                label="Insira seu melhor e-mail"
                name="email"
                formValidations={formValidations}
                value={values.email}
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
                value={values.password}
                onChange={setFieldValue} />
            <FormTextMaterial
                label="Confirme sua senha"
                name="confirmPassword"
                type="password"
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired, validateMinFive, validatePassword]}
                value={values.confirmPassword}
                onChange={setFieldValue} />
            <FormTextMaterial
                label="Digite seu CPF"
                name="cpf"
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                validatesOnChange={[isRequired, validateCpf]}
                maskOnChange={cpfMask}
                value={values.cpf}
                onChange={setFieldValue} />
            <FormCheckboxComponent
                label={<label className="contract-term-label">Li e aceito os <a className="contract-term-link" onClick={toggleTermContractModal}>termos de contrato</a></label>}
                name="termOfContract"
                formValidations={formValidations}
                setFormValidations={setFormValidations}
                value={values.termOfContract}
                onChange={setFieldValue} />
        </StyledAcessForm>
    )

}

export default connect()(AcessForm);
