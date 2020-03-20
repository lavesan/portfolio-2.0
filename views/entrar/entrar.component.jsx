import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import { StyledEntrarPage } from './entrar.styles';
import { LoginFormComponent } from '../../components/login-form';
import { RegisterFormComponent } from '../../components/register-form';
import { StyledSuccessButton } from '../../components/button';
import { setSelectedForm } from '../../store/actions/authActions';
import loginImg from '../../public/static/imgs/login-image.png';

const EntrarPage = ({ dispatch, selectedForm }) => {

    const router = useRouter();

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

    const returnPage = async (e) => {
        e.preventDefault();
        await dispatch(setSelectedForm({
            selectedForm: 'login'
        }));
        router.back();
    }

    return (
        <StyledEntrarPage isLoginForm={isLoginForm}>
            <section className="authentication-form-section">
                <header className="authentication-header">
                    {isLoginForm &&
                        <div className="return-login-container">
                            {/* <Link href="/inicio"> */}
                            <FontAwesomeIcon icon={faArrowLeft} onClick={returnPage} />
                            <a href="#" onClick={returnPage}>Voltar a navegar</a>
                            {/* </Link> */}
                        </div>
                    }
                    <div className="authentication-header--title">
                        <h1>Seja Bem-vindo</h1>
                        <p>{headerParagraph}</p>
                    </div>
                    {!isLoginForm &&
                        <div className="authentication-header--actions">
                            {/* <Link href="/inicio"> */}
                                <StyledSuccessButton onClick={returnPage}>
                                    Voltar a navegar
                                </StyledSuccessButton>
                            {/* </Link> */}
                        </div>
                    }
                </header>
                {isLoginForm
                    ? <LoginFormComponent />
                    :
                    <>
                        <div className="register-head-line">
                            <div></div>
                        </div>
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
