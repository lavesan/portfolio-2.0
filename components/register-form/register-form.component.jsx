import React from 'react';
import { connect } from 'react-redux';

import { setRegisterFormValues } from '../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { FormTextMaterial } from '../form/form-text-material';
import { FormTextareaMaterial } from '../form/form-textarea-material';
import { FormCheckboxComponent } from '../form/form-checkbox';
import { FormSelectComponent } from '../form/form-select';
import { userRoleOpts } from '../../helpers/register.helpers';
import { toggleTermOfContractModal } from '../../store/actions/modalActions';

const RegisterFormComponent = ({ dispatch, registerForm }) => {

    const setFieldValue = (name, value) => {

        dispatch(setRegisterFormValues({
            name,
            value,
        }));

    }

    const toggleTermContractModal = () => {
        console.log('modificando')
        dispatch(toggleTermOfContractModal());
    }

    const onSubmit = (e) => {

        e.preventDefault();

    }

    return (
        <StyledRegisterForm onSubmit={onSubmit}>
            <div className="credentials-form">
                <h2>Email e senha</h2>
                <FormTextMaterial
                    label="Insira seu melhor e-mail"
                    name="email"
                    value={registerForm.email}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Crie uma senha"
                    name="password"
                    type="password"
                    value={registerForm.password}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Confirme sua senha"
                    name="confirmPassword"
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={setFieldValue} />
                <FormCheckboxComponent
                    label={<label className="contract-term-label">Li e aceito os <a className="contract-term-link" onClick={toggleTermContractModal}>termos de contrato</a></label>}
                    name="termOfContract"
                    value={registerForm.termOfContract}
                    onChange={setFieldValue} />
            </div>
            <div className="info-form">
                <h2>Informações pessoais</h2>
                <FormTextMaterial
                    label="Sua idade"
                    name="age"
                    value={registerForm.age}
                    onChange={setFieldValue} />
                <FormSelectComponent
                    label="Seu papel"
                    name="role"
                    value={registerForm.role}
                    onChange={setFieldValue}
                    options={userRoleOpts} />
            </div>
            <div>
                <FormTextMaterial
                    label="Quant. de animais"
                    name="animalsQuantity"
                    value={registerForm.animalsQuantity}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Quant. de crianças"
                    name="childrensQuantity"
                    value={registerForm.childrensQuantity}
                    onChange={setFieldValue} />
                <FormTextareaMaterial
                    label="Descrição"
                    placeholder="Escreva uma breve descrição sua"
                    name="description"
                    errorMessage="No máximo 100 caracteres"
                    value={registerForm.description}
                    onChange={setFieldValue} />
            </div>
        </StyledRegisterForm>
    )

}

const mapStateToProps = store => ({
    registerForm: store.authState.registerForm,
})

export default connect(mapStateToProps)(RegisterFormComponent);
