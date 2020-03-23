import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import { StyledLoginForm } from './login-form.styles';
import { SucessButtonComponent } from '../../../components/button';
import { setLoginFormValues, setLoginFormValidations } from '../../../store/actions/authActions';
import { FormTextMaterial } from '../../../components/form/form-text-material';
import { setSelectedForm, setUserInfo } from '../../../store/actions/authActions';
import { isRequired, validateEmail } from '../../../helpers/validations.helpers';
import { authInstance } from '../../../services/auth.service';
import { AuthenticationFooterComponent } from '../authentication-footer';
import { StyledHeaderCotainer } from '../entrar.styles';

const LoginFormComponent = ({ dispatch, loginForm, returnPage, loginFormValidations }) => {

    const router = useRouter();

    const authService = authInstance.getInstance();
    
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const setFormValidations = (func) => {

        const validations = func(loginFormValidations);
        dispatch(setLoginFormValidations(validations));

    }

    const headerParagraph = 'Vamos iniciar suas compras :)';

    const formInvalid = () => {
        
        const validations = Object.values(loginFormValidations);
        return validations.some(validation => validation.invalid);

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        if (!submitted) {
            setSubmitted(true);
        }

        if (formInvalid()) {
            return;
        }

        await authService.login({
            email: loginForm.email,
            password: loginForm.password,
        })
            .then(res => {
                dispatch(setUserInfo({
                    ...res.user,
                    token: res.token,
                }));
                router.push('/inicio');
            })
            .catch(err => {
                console.log(err);
            })

        setLoading(false);

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
                        startValidations={submitted}
                        validatesOnChange={[isRequired, validateEmail]}
                        formValidations={loginFormValidations}
                        setFormValidations={setFormValidations}
                        value={loginForm.email}
                        onChange={setFieldValue} />
                    <FormTextMaterial
                        label="Sua senha"
                        type="password"
                        name="password"
                        startValidations={submitted}
                        validatesOnChange={[isRequired]}
                        formValidations={loginFormValidations}
                        setFormValidations={setFormValidations}
                        value={loginForm.password}
                        onChange={setFieldValue} />
                </div>
                <div className="login-form-buttons-container">
                    <SucessButtonComponent
                        notDense={'true'}
                        type="submit"
                        text="Entrar"
                        loading={loading}
                        className="submit-button" />
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
    loginFormValidations: store.authState.loginFormValidations,
})

export default connect(mapStateToProps)(LoginFormComponent);
