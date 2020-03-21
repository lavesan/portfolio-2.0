import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { setRegisterFormValues } from '../../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { authInstance } from '../../../services/auth.service';
import { AccessForm } from './access-form';
import { PersonalForm } from './personal-form';
import { AddressForm } from './address-form';
import { StyledSuccessButton } from '../../../components/button';
import { AuthenticationFooterComponent } from '../authentication-footer';

const RegisterFormComponent = ({ dispatch, registerForm }) => {

    const authService = authInstance.getInstance();

    const setFieldValue = (name, value) => {

        dispatch(setRegisterFormValues({
            name,
            value,
        }));

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
        <StyledRegisterForm onSubmit={onSubmit}>
            <div className="form-row">
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
            </div>
            <div className="button-row">
                <div></div>
                <AuthenticationFooterComponent className="footer-container" />
                <div>
                    <StyledSuccessButton className="button-container" type="submit">Criar cadastro</StyledSuccessButton>
                </div>
            </div>
        </StyledRegisterForm>
    )

}

const mapStateToProps = store => ({
    registerForm: store.authState.registerForm,
})

export default connect(mapStateToProps)(RegisterFormComponent);
