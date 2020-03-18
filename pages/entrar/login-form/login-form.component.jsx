import React from 'react';
import { connect } from 'react-redux';

import { StyledLoginForm } from './login-form.styles';
import { StyledSuccessButton } from '../../../components/button';
import { setLoginFormValues } from '../../../store/actions/authActions';
import { FormTextMaterial } from '../../../components/form/form-text-material';
import { setSelectedForm } from '../../../store/actions/authActions';

const LoginFormComponent = ({ dispatch, loginForm }) => {

    const onSubmit = (e) => {

        e.preventDefault();

    }

    const setFieldValue = (name, value) => {
        dispatch(setLoginFormValues({
            name,
            value,
        }));
    }
    
    const registerSelectedForm = (e) => {
        e.preventDefault();
        dispatch(setSelectedForm('register'));
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
})

export default connect(mapStateToProps)(LoginFormComponent);
