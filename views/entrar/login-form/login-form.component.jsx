import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { StyledLoginForm } from './login-form.styles';
import { StyledSuccessButton } from '../../../components/button';
import { setLoginFormValues } from '../../../store/actions/authActions';
import { FormTextMaterial } from '../../../components/form/form-text-material';
import { setSelectedForm, setUserInfo } from '../../../store/actions/authActions';
import { useState } from 'react';
import { isRequired, validateEmail } from '../../../helpers/validations.helpers';
import { authInstance } from '../../../services/auth.service';
import { AuthenticationFooterComponent } from '../authentication-footer';
import { StyledHeaderCotainer } from '../entrar.styles';

const LoginFormComponent = ({ dispatch, loginForm, returnPage }) => {

    const authService = authInstance.getInstance();

    const [formValidations, setFormValidations] = useState({});

    const headerParagraph = 'Vamos iniciar suas compras :)';

    const onSubmit = (e) => {

        e.preventDefault();

        authService.login({
            email: loginForm.email,
            password: loginForm.password,
        })
            .then(res => {
                dispatch(setUserInfo({
                    ...res.user,
                    token: res.token,
                }));
            })
            .catch(err => {
                console.log(err);
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
        <StyledLoginForm>
            <StyledHeaderCotainer>
                <div className="return-login-container">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={returnPage} />
                    <a href="#" onClick={returnPage}>Voltar a navegar</a>
                </div>
                <div className="authentication-header--title">
                    <h1>Seja Bem-vindo</h1>
                    <p>{headerParagraph}</p>
                </div>
            </StyledHeaderCotainer>
            <form onSubmit={onSubmit} className="login-form">
                <div className="login-form-inputs-container">
                    <FormTextMaterial
                        label="Insira seu email"
                        name="email"
                        validatesOnChange={[isRequired, validateEmail]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        value={loginForm.email}
                        onChange={setFieldValue} />
                    <FormTextMaterial
                        label="Sua senha"
                        type="password"
                        name="password"
                        validatesOnChange={[isRequired]}
                        formValidations={formValidations}
                        setFormValidations={setFormValidations}
                        value={loginForm.password}
                        onChange={setFieldValue} />
                </div>
                <div className="login-form-buttons-container">
                    <StyledSuccessButton
                        notDense={'true'}
                        type="submit"
                        className="submit-button">
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
            </form>
        </StyledLoginForm>
    )

}

const mapStateToProps = store => ({
    loginForm: store.authState.loginForm,
})

export default connect(mapStateToProps)(LoginFormComponent);
