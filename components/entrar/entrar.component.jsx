import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { StyledEntrarPage } from './entrar.styles';
import { LoginFormComponent } from '../../components/login-form';
import { RegisterFormComponent } from '../../components/register-form';
import loginImg from '../../public/static/imgs/login-image.png';

const EntrarPage = ({ dispatch, selectedForm }) => {

    const headerParagraph = useMemo(
        () => {
            return selectedForm === 'login'
                ? 'Vamos iniciar suas compras :)'
                : 'Vamos fazer o seu cadastro rapidinho :)'
        },
        [selectedForm]
    )

    const isLoginForm = useMemo(
        () => {
            return selectedForm === 'login';
        },
        [selectedForm]
    )

    return (
        <StyledEntrarPage isLoginForm={isLoginForm}>
            <section className="authentication-form-section">
                <header className="authentication-header">
                    <h1>Seja Bem-vindo</h1>
                    <p>{headerParagraph}</p>
                </header>
                {isLoginForm
                    ? <LoginFormComponent />
                    :
                    <>
                        <div className="register-head-line" />
                        <RegisterFormComponent />
                    </>
                }
                <footer className="authentiication-footer">
                    <p>
                        Direitos reservados a zero veneno produtos orgânicos
                    </p>
                </footer>
            </section>
            {isLoginForm &&
                <section className="login-img-container">
                    <img
                        src={loginImg}
                        alt="Imagem de frutas para login" />
                </section>
            }
        </StyledEntrarPage>        
    )

}

const mapStateToProps = store => ({
    selectedForm: store.authState.selectedForm,
})

export default connect(mapStateToProps)(EntrarPage);
