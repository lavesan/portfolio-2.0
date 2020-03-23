import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import { setRegisterFormValues, advanceReturnRegisterFormStep, setRegisterFormValidations } from '../../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { authInstance } from '../../../services/auth.service';
import { AccessForm } from './access-form';
import { PersonalForm } from './personal-form';
import { AddressForm } from './address-form';
import { StyledSuccessButton, StyledFullRevSuccessButton } from '../../../components/button';
import { AuthenticationFooterComponent } from '../authentication-footer';
import { StyledHeaderCotainer } from '../entrar.styles';

const RegisterFormComponent = ({ dispatch, registerForm, screenWidth, registerFormStep, returnPage, registerFormValidations }) => {

    const router = useRouter();

    const authService = authInstance.getInstance();

    const headerParagraph = 'Vamos fazer o seu cadastro rapidinho :)';

    const [submittedBig, setSubmittedBig] = useState(false);

    const [submittedSteps, setSubmittedSteps] = useState({
        first: false,
        second: false,
        finish: false,
    });

    const setFieldValue = (name, value) => {

        dispatch(setRegisterFormValues({
            name,
            value,
        }));

    }
    
    const returnResponsiveRegister = () => {
        dispatch(advanceReturnRegisterFormStep(false));
    }

    const advanceResponsiveRegister = async () => {

        if (registerFormStep === 1) {
            await validateFirstStep();
        } else if (registerFormStep === 2) {
            await validateSecondStep();
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

        const accessFormKeys = ['name', 'email', 'password', 'confirmPassword', 'cpf', 'termOfContract'];
        
        let invalid = false;

        for (const key of accessFormKeys) {
            console.log('registerFormValidations[key]: ', registerFormValidations[key]);
            if (registerFormValidations[key] && registerFormValidations[key].invalid) {
                invalid = true;
                break;
            }
        }

        return invalid;

    }

    const secondStepInvalid = () => {

        const accessFormKeys = ['gender', 'age', 'animalsQuantity', 'childrensQuantity', 'role'];
        
        let invalid = false;

        for (const key of accessFormKeys) {
            if (registerFormValidations[key] && registerFormValidations[key].invalid) {
                invalid = true;
                break;
            }
        }

        return invalid;

    }

    const lastStepInvalid = () => {

        const addressFormKeys = ['cep', 'address', 'number', 'district', 'complement', 'type'];
        
        let invalid = false;

        for (const key of addressFormKeys) {
            if (registerFormValidations[key] && registerFormValidations[key].invalid) {
                invalid = true;
                break;
            }
        }

        return invalid;

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

    const finishRegister = () => {

        const { cep, address, number, district, complement, type, ...userData } = registerForm;

        const body = {
            ...userData,
            address: {
                address,
                cep,
                number,
                complement,
                type,
                district,
            }
        }
        
        authService.save(body)
            .then(res => {
                router.push('/inicio');
                console.log('resposta: ', res);
            })
            .catch(err => {
                console.log('erro: ', err);
            });
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
                                    values={registerForm}
                                    startValidations={submittedBig}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations}
                                    setFieldValue={setFieldValue} />
                            </div>
                            <div className="info-form">
                                <PersonalForm
                                    values={registerForm}
                                    startValidations={submittedBig}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations}
                                    setFieldValue={setFieldValue} />
                            </div>
                            <div className="address-form">
                                <AddressForm
                                    values={registerForm}
                                    startValidations={submittedBig}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations}
                                    setFieldValue={setFieldValue} />
                            </div>
                        </>
                        : <div className="full-width">
                            {registerFormStep === 1 && 
                                <AccessForm
                                    values={registerForm}
                                    isResponsive={isResponsive}
                                    startValidations={submittedSteps.first}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations}
                                    setFieldValue={setFieldValue} />
                            }
                            {registerFormStep === 2 &&
                                <PersonalForm
                                    values={registerForm}
                                    isResponsive={isResponsive}
                                    startValidations={submittedSteps.second}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations}
                                    setFieldValue={setFieldValue} />
                            }
                            {registerFormStep === 3 &&
                                <AddressForm
                                    values={registerForm}
                                    isResponsive={isResponsive}
                                    startValidations={submittedSteps.finish}
                                    setFormValidations={setFormValidations}
                                    formValidations={registerFormValidations}
                                    setFieldValue={setFieldValue} />
                            }
                        </div>
                    }
                </div>
                {!isResponsive
                    ? <div className="button-row">
                        <div></div>
                        <AuthenticationFooterComponent className="footer-container" />
                        <div>
                            <StyledSuccessButton className="button-container" type="submit">Criar cadastro</StyledSuccessButton>
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
                            : <StyledSuccessButton
                                type="button"
                                notDense={'true'}
                                className="step-button-row"
                                onClick={onResponsiveSubmit}>
                                    Criar cadastro
                            </StyledSuccessButton>
                        }
                    </>
                }
            </form>
        </StyledRegisterForm>
    )

}

const mapStateToProps = store => ({
    registerFormStep: store.authState.registerFormStep,
    registerForm: store.authState.registerForm,
    registerFormValidations: store.authState.registerFormValidations,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(RegisterFormComponent);
