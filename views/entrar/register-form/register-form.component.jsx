import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useToasts } from "react-toast-notifications";

import {
    advanceReturnRegisterFormStep,
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
import { setSelectedForm } from '../../../store/actions/authActions';
import { setOrdersData } from '../../../store/actions/orderActions';
import { sendBackendDistrict } from '../../../helpers/order.helpers';

const RegisterFormComponent = ({ dispatch, screenWidth, registerFormStep, returnPage, addressRegisterForm, personalRegisterForm, accessRegisterForm, accessFormValidations, personalFormValidations, addressFormValidations }) => {

    const authService = authInstance.getInstance();
    
    const { addToast } = useToasts();
    
    const router = useRouter();
    
    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

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

        // Navigates to the top of the page
        const link = document.getElementById('click-link-page-top');
        if (link) {
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

    const firstStepInvalid = () => {

        const values = Object.values(accessFormValidations);
        return values.some(value => value.invalid);

    }

    const secondStepInvalid = () => {

        const values = Object.values(personalFormValidations);
        return values.some(value => value.invalid);

    }

    const lastStepInvalid = () => {

        const values = Object.values(addressFormValidations);
        return values.some(value => value.invalid);

    }

    const formInvalid = () => {
        return firstStepInvalid() || secondStepInvalid() || lastStepInvalid();
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
            if (!accessRegisterForm.termOfContract) {
                showToast('Aceite os termos de contrato para continuar');
            }
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
            legalDocument: accessRegisterForm.cpf,
            role: Number(personalRegisterForm.role),
            address: {
                ...addressRegisterForm,
                district: sendBackendDistrict(addressRegisterForm.district),
            },
        }

        await authService.save(body)
            .then(res => {
                dispatch(setUserInfo(res.user, res.token));
                dispatch(setOrdersData([]));
                router.push('/inicio');
            })
            .catch(({ message }) => {
                showToast(typeof message === 'string' ? message : 'Aconteceu um erro interno. Por favor tente mais tarde.');
            });
        setLoading(false);
    }

    const goToLogin = () => {
        dispatch(setSelectedForm({ selectedForm: 'login' }));
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
                : <div className="return-login-container">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={returnPage} />
                    <a href="#" onClick={goToLogin}>Efetuar o login</a>
                </div>
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
                                    startValidations={submittedBig} />
                            </div>
                            <div className="info-form">
                                <PersonalForm
                                    startValidations={submittedBig} />
                            </div>
                            <div className="address-form">
                                <AddressForm
                                    startValidations={submittedBig} />
                            </div>
                        </>
                        : <>
                            <div id="top-page"></div>
                            <a id="click-link-page-top" href="#top-page" style={{ display: 'none' }}></a>
                            <div className="full-width">
                                {registerFormStep === 1 && 
                                    <AccessForm
                                        isResponsive={isResponsive}
                                        startValidations={submittedSteps.first} />
                                }
                                {registerFormStep === 2 &&
                                    <PersonalForm
                                        isResponsive={isResponsive}
                                        startValidations={submittedSteps.second} />
                                }
                                {registerFormStep === 3 &&
                                    <AddressForm
                                        isResponsive={isResponsive}
                                        startValidations={submittedSteps.finish} />
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
    accessRegisterForm: store.authState.accessRegisterForm,
    personalRegisterForm: store.authState.personalRegisterForm,
    addressRegisterForm: store.authState.addressRegisterForm,
    accessFormValidations: store.authState.accessFormValidations,
    personalFormValidations: store.authState.personalFormValidations,
    addressFormValidations: store.authState.addressFormValidations,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(RegisterFormComponent);
