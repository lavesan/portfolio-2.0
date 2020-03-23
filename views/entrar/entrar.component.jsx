import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { StyledEntrarPage } from './entrar.styles';
import { LoginFormComponent } from './login-form';
import { RegisterFormComponent } from './register-form';
import { setSelectedForm } from '../../store/actions/authActions';
import { ResponsiveMenuIcon } from '../../components/header/responsive-menu-icon';
import loginImg from '../../public/static/imgs/login-image.png';

const EntrarPage = ({ dispatch, selectedForm, screenWidth, registerFormStep }) => {

    const router = useRouter();

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
        router.push('/inicio');
    }

    return (
        <StyledEntrarPage loginImg={loginImg} isLoginForm={isLoginForm} registerFormStep={registerFormStep}>
            {screenWidth < 700 &&
                <div className="responsive-icon-menu-container">
                    <div></div>
                    <div></div>
                    <div className="responsive-icon-menu-container--slot">
                        <ResponsiveMenuIcon />
                    </div>
                </div>
            }
            <section className="authentication-form-section">
                {isLoginForm
                    ? <LoginFormComponent returnPage={returnPage} />
                    : <RegisterFormComponent returnPage={returnPage} />
                }
            </section>
            {screenWidth >= 700 && isLoginForm
                ?
                <section className="login-img-container">
                    <img
                        src={loginImg}
                        alt="Imagem de frutas para login" />
                </section>
                : ''
            }
        </StyledEntrarPage>        
    )

}

const mapStateToProps = store => ({
    registerFormStep: store.authState.registerFormStep,
    selectedForm: store.authState.selectedForm,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(EntrarPage);
