import React from 'react';
import { connect } from 'react-redux';

import { setRegisterFormValues } from '../../../store/actions/authActions';
import { StyledRegisterForm } from './register-form.styles';
import { FormTextMaterial } from '../../../components/form/form-text-material';

const RegisterFormComponent = ({ dispatch, registerForm }) => {

    const setFieldValue = (name, value) => {

        dispatch(setRegisterFormValues({
            name,
            value,
        }));

    }

    const onSubmit = (e) => {

        e.preventDefault();

    }

    return (
        <StyledRegisterForm onSubmit={onSubmit}>
            <div className="credentials-form">
                <h2>Email e senha</h2>
                <FormTextMaterial
                    label="Insira seu melhor e-mail"
                    name="email"
                    value={registerForm.email}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Crie uma senha"
                    name="password"
                    type="password"
                    value={registerForm.password}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Confirme sua senha"
                    name="confirmPassword"
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={setFieldValue} />
            </div>
            <div className="info-form">
                <h2>Informações pessoais</h2>
                <FormTextMaterial
                    label="Sua idade"
                    name="age"
                    value={registerForm.age}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Quantidade de crianças"
                    name="childrensQuantity"
                    value={registerForm.childrensQuantity}
                    onChange={setFieldValue} />
            </div>
            <div>
                <FormTextMaterial
                    label="Quantidade de animais"
                    name="animalsQuantity"
                    value={registerForm.animalsQuantity}
                    onChange={setFieldValue} />
                <FormTextMaterial
                    label="Quantidade de crianças"
                    name="childrensQuantity"
                    value={registerForm.childrensQuantity}
                    onChange={setFieldValue} />
            </div>
        </StyledRegisterForm>
    )

}

const mapStateToProps = store => ({
    registerForm: store.authState.registerForm,
})

export default connect(mapStateToProps)(RegisterFormComponent);
