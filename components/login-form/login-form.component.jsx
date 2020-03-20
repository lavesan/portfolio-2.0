import React from 'react';
import { connect } from 'react-redux';

import { StyledLoginForm } from './login-form.styles';
import { StyledSuccessButton } from '../button';
import { setLoginFormValues } from '../../store/actions/authActions';
import { FormTextMaterial } from '../form/form-text-material';
import { setSelectedForm, setUserInfo } from '../../store/actions/authActions';

const LoginFormComponent = ({ dispatch, loginForm, authService }) => {

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
                    value={loginForm.email}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Senha"
                    type="password"
                    name="password"
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
        </StyledLoginForm>
    )

}

const mapStateToProps = store => ({
    loginForm: store.authState.loginForm,
    authService: store.servicesState.authService,
})

export default connect(mapStateToProps)(LoginFormComponent);
