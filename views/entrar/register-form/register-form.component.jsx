import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { setRegisterFormValues, advanceReturnRegisterFormStep } from '../../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { authInstance } from '../../../services/auth.service';
import { AccessForm } from './access-form';
import { PersonalForm } from './personal-form';
import { AddressForm } from './address-form';
import { StyledSuccessButton } from '../../../components/button';
import { AuthenticationFooterComponent } from '../authentication-footer';
import { StyledHeaderCotainer } from '../entrar.styles';

const RegisterFormComponent = ({ dispatch, registerForm, screenWidth, registerFormStep, returnPage }) => {

    const authService = authInstance.getInstance();

    const headerParagraph = 'Vamos fazer o seu cadastro rapidinho :)';

    const setFieldValue = (name, value) => {

        dispatch(setRegisterFormValues({
            name,
            value,
        }));

    }
    
    const returnResponsiveRegister = () => {
        dispatch(advanceReturnRegisterFormStep(false));
    }

    const advanceResponsiveRegister = () => {
        dispatch(advanceReturnRegisterFormStep(true));
    }

    const GetFormByStep = () => {
        if (registerFormStep === 1) {
            return (
                <></>
                // <AccessForm
                //     values={registerForm}
                //     setFormValidations={setFormValidations}
                //     formValidations={formValidations}
                //     setFieldValue={setFieldValue} />
            )
        }
        else if (registerFormStep === 2) {
            return (
                <></>
                // <PersonalForm
                //     values={registerForm}
                //     setFormValidations={setFormValidations}
                //     formValidations={formValidations}
                //     setFieldValue={setFieldValue} />
            )
        } else {
            return (
                <>
                </>
                // <AddressForm
                //     values={registerForm}
                //     setFormValidations={setFormValidations}
                //     formValidations={formValidations}
                //     setFieldValue={setFieldValue} />
            )
        }
    }

    const [formValidations, setFormValidations] = useState({});

    const formInvalid = useMemo(
        () => {

            const validations = Object.values(formValidations);
            return validations.some(validation => validation.invalid)

        },
        [formValidations]
    )

    const onSubmit = (e) => {

        e.preventDefault();

        if (formInvalid) {
            return;
        }

        authService.save();

    }

    return (
        <StyledRegisterForm>
            {screenWidth < 700
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
                    <StyledSuccessButton onClick={returnPage}>
                        Voltar a navegar
                    </StyledSuccessButton>
                </div>
            </StyledHeaderCotainer>
            <div className="register-head-line">
                <div></div>
            </div>
            <form onSubmit={onSubmit} className="form-container">
                <div className="form-row">
                    {screenWidth >= 700
                        ? <>
                            <div className="credentials-form">
                                <AccessForm
                                    values={registerForm}
                                    setFormValidations={setFormValidations}
                                    formValidations={formValidations}
                                    setFieldValue={setFieldValue} />
                            </div>
                            <div className="info-form">
                                <PersonalForm
                                    values={registerForm}
                                    setFormValidations={setFormValidations}
                                    formValidations={formValidations}
                                    setFieldValue={setFieldValue} />
                            </div>
                            <div className="address-form">
                                <AddressForm
                                    values={registerForm}
                                    setFormValidations={setFormValidations}
                                    formValidations={formValidations}
                                    setFieldValue={setFieldValue} />
                            </div>
                        </>
                        : <div className="full-width">
                            <GetFormByStep />
                        </div>
                    }
                </div>
                {screenWidth >= 700
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
                                className="step-button-row"
                                onClick={advanceResponsiveRegister}>
                                    Prosseguir
                            </StyledSuccessButton>
                            : <StyledSuccessButton
                                type="button"
                                className="step-button-row"
                                onClick={onSubmit}>
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
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(RegisterFormComponent);
