import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import {
    advanceReturnRegisterFormStep,
    setRegisterFormValidations,
    setUserInfo,
} from '../../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { authInstance } from '../../../services/auth.service';
import { AccessForm } from './access-form';
import { PersonalForm } from './personal-form';
import { AddressForm } from './address-form';
import { StyledSuccessButton, StyledFullRevSuccessButton, SucessButtonComponent } from '../../../components/button';
import { AuthenticationFooterComponent } from '../authentication-footer';
import { StyledHeaderCotainer } from '../entrar.styles';

const RegisterFormComponent = ({ dispatch, screenWidth, registerFormStep, returnPage, registerFormValidations, addressRegisterForm, personalRegisterForm, accessRegisterForm }) => {

    const router = useRouter();

    const authService = authInstance.getInstance();

    const headerParagraph = 'Vamos fazer o seu cadastro rapidinho :)';

    const [submittedBig, setSubmittedBig] = useState(false);

    const [submittedSteps, setSubmittedSteps] = useState({
        first: false,
        second: false,
        finish: false,
    });

    const [loading, setLoading] = useState(false);
    
    const returnResponsiveRegister = () => {
        dispatch(advanceReturnRegisterFormStep(false));
    }

    const advanceResponsiveRegister = async () => {

        if (registerFormStep === 1) {
            await validateFirstStep();
        } else if (registerFormStep === 2) {
            await validateSecondStep();
        }

        const link = document.getElementById('click-link-page-top');
        if (link) {
            console.log('link: ', link);
            link.click();
        }

        dispatch(advanceReturnRegisterFormStep(true));

    }

    const isResponsive = useMemo(
        () => {
            return screenWidth < 700;
        },
        [screenWidth]
    )

    const setFormValidations = (func) => {

        const validations = func(registerFormValidations);
        dispatch(setRegisterFormValidations(validations));

    }

    const firstStepInvalid = () => {

        const values = Object.values(registerFormValidations.access);
        return values.some(value => value.invalid);

    }

    const secondStepInvalid = () => {

        const values = Object.values(registerFormValidations.personal);
        return values.some(value => value.invalid);

    }

    const lastStepInvalid = () => {

        const values = Object.values(registerFormValidations.address);
        return values.some(value => value.invalid);

    }

    const formInvalid = () => {

        const validations = Object.values(registerFormValidations);
        return validations.some(validation => validation.invalid)

    }

    const validateFirstStep = () => {
        return new Promise((resolve, reject) => {
            
            if (!submittedSteps.first) {
                setSubmittedSteps(f => ({
                    ...f,
                    first: true,
                }));
            }
    
            if (firstStepInvalid()) {
                reject();
            }
            resolve();
        })
    }
    const validateSecondStep = () => {
        return new Promise((resolve, reject) => {

            if (!submittedSteps.second) {
                setSubmittedSteps(f => ({
                    ...f,
                    second: true,
                }));
            }
    
            if (secondStepInvalid()) {
                reject();
            }
            resolve();

        })
    }
    const validateFinishStep = () => {
        return new Promise((resolve, reject) => {

            if (!submittedSteps.finish) {
                setSubmittedSteps(f => ({
                    ...f,
                    finish: true,
                }));
            }
    
            if (lastStepInvalid()) {
                reject();
            }
            resolve();

        })
    }

    const onSubmit = (e) => {

        e.preventDefault();

        if (!submittedBig) {
            setSubmittedBig(true);
        }

        if (formInvalid()) {
            return;
        }

        finishRegister();

    }

    const onResponsiveSubmit = async () => {
        await validateFinishStep()
            .then(() => {
                finishRegister();
            });
    }

    const finishRegister = async () => {

        setLoading(true);

        const body = {
            ...personalRegisterForm,
            ...accessRegisterForm,
            address: addressRegisterForm,
        }
        
        await authService.save(body)
            .then(res => {
                dispatch(setUserInfo(res.user, res.token));
                router.push('/inicio');
            })
            .catch(err => {
                console.log('erro: ', err);
            });
        setLoading(false);
    }

    return (
        <StyledRegisterForm>
            {isResponsive
                ? <div className="return-login-container">
                    {registerFormStep > 1
                        ? <>
                            <FontAwesomeIcon icon={faArrowLeft} onClick={returnPage} />
                            <a href="#" onClick={returnResponsiveRegister}>Voltar</a>
                        </>
                        : ''
                    }
                </div>
                : ''
            }
            <StyledHeaderCotainer className="register-header">
                <div className="authentication-header--title">
                    <h1>Seja Bem-vindo</h1>
                    <p>{headerParagraph}</p>
                </div>
                <div className="authentication-header--actions">
                    <StyledFullRevSuccessButton onClick={returnPage}>
                        Voltar a navegar
                    </StyledFullRevSuccessButton>
                </div>
            </StyledHeaderCotainer>
            <div className="register-head-line">
                <div></div>
            </div>
            <form onSubmit={onSubmit} className="form-container">
                <div className="form-row">
                    {!isResponsive
                        ? <>
                            <div className="credentials-form">
                                <AccessForm
                                    startValidations={submittedBig}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations} />
                            </div>
                            <div className="info-form">
                                <PersonalForm
                                    startValidations={submittedBig}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations} />
                            </div>
                            <div className="address-form">
                                <AddressForm
                                    startValidations={submittedBig}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations} />
                            </div>
                        </>
                        : <>
                            <div id="top-page"></div>
                            <a id="click-link-page-top" href="#top-page" style={{ display: 'none' }}></a>
                            <div className="full-width">
                                {registerFormStep === 1 && 
                                    <AccessForm
                                        isResponsive={isResponsive}
                                        startValidations={submittedSteps.first}
                                        setFormValidations={setFormValidations}
                                        formValidations={registerFormValidations} />
                                }
                                {registerFormStep === 2 &&
                                    <PersonalForm
                                        isResponsive={isResponsive}
                                        startValidations={submittedSteps.second}
                                        setFormValidations={setFormValidations}
                                        formValidations={registerFormValidations} />
                                }
                                {registerFormStep === 3 &&
                                    <AddressForm
                                        isResponsive={isResponsive}
                                        startValidations={submittedSteps.finish}
                                        setFormValidations={setFormValidations}
                                        formValidations={registerFormValidations} />
                                }
                            </div>
                        </>
                    }
                </div>
                {!isResponsive
                    ? <div className="button-row">
                        <div></div>
                        <AuthenticationFooterComponent className="footer-container" />
                        <div>
                            <SucessButtonComponent
                                loading={loading}
                                className="button-container"
                                type="submit"
                                text="Criar cadastro" />
                        </div>
                    </div>
                    : <>
                        {registerFormStep < 3
                            ? <StyledSuccessButton
                                type="button"
                                notDense={'true'}
                                className="step-button-row"
                                onClick={advanceResponsiveRegister}>
                                    Prosseguir
                            </StyledSuccessButton>
                            : <SucessButtonComponent
                                type="button"
                                notDense={'true'}
                                className="step-button-row"
                                text="Criar cadastro"
                                loading={loading}
                                onClick={onResponsiveSubmit} />
                        }
                    </>
                }
            </form>
        </StyledRegisterForm>
    )

}

const mapStateToProps = store => ({
    registerFormStep: store.authState.registerFormStep,
    registerFormValidations: store.authState.registerFormValidations,
    accessRegisterForm: store.authState.accessRegisterForm,
    personalRegisterForm: store.authState.personalRegisterForm,
    addressRegisterForm: store.authState.addressRegisterForm,
    screenWidth: store.uiState.screenWidth,

})

export default connect(mapStateToProps)(RegisterFormComponent);
