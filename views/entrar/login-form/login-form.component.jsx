import React from 'react';
import { connect } from 'react-redux';

import { StyledLoginForm } from './login-form.styles';
import { StyledSuccessButton } from '../../../components/button';
import { setLoginFormValues } from '../../../store/actions/authActions';
import { FormTextMaterial } from '../../../components/form/form-text-material';
import { setSelectedForm, setUserInfo } from '../../../store/actions/authActions';
import { useState } from 'react';
import { isRequired, validateEmail } from '../../../helpers/validations.helpers';
import { authInstance } from '../../../services/auth.service';
import { AuthenticationFooterComponent } from '../authentication-footer';

const LoginFormComponent = ({ dispatch, loginForm }) => {

    const authService = authInstance.getInstance();

    const [formValidations, setFormValidations] = useState({});

    const onSubmit = (e) => {

        e.preventDefault();

        authService.login({
            login: loginForm.email,
            password: loginForm.password,
        })
            .then(res => {
                dispatch(setUserInfo({
                    ...res.user,
                    token: res.token,
                }));
            })

    }

    const setFieldValue = (name, value) => {
        dispatch(setLoginFormValues({
            name,
            value,
        }));
    }
    
    const registerSelectedForm = (e) => {
        e.preventDefault();
        dispatch(setSelectedForm({ selectedForm: 'register' }));
    }

    return (
        <StyledLoginForm onSubmit={onSubmit}>
            <div className="login-form-inputs-container">
                <FormTextMaterial
                    label="Email"
                    name="email"
                    validatesOnChange={[isRequired, validateEmail]}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={loginForm.email}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Senha"
                    type="password"
                    name="password"
                    validatesOnChange={[isRequired]}
                    formValidations={formValidations}
                    setFormValidations={setFormValidations}
                    value={loginForm.password}
                    onChange={setFieldValue} />
            </div>
            <div className="login-form-buttons-container">
                <StyledSuccessButton type="submit" className="submit-button">
                    Entrar
                </StyledSuccessButton>
                <nav className="register-link-container">
                    <p>Não tem uma conta?</p>
                    <a
                        href="#"
                        onClick={registerSelectedForm}>
                            Cadastre-se
                    </a>
                </nav>
            </div>
            <div className="authentication-footer-description">
                <AuthenticationFooterComponent className="footer-container" />
            </div>
        </StyledLoginForm>
    )

}

const mapStateToProps = store => ({
    loginForm: store.authState.loginForm,
})

export default connect(mapStateToProps)(LoginFormComponent);
