import React from 'react';
import { connect } from 'react-redux';
// import TextField from '@material/textfield';
import TextField, {HelperText, Input} from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

import { StyledLoginForm } from './login-form.styles';
import { StyledSuccessButton } from '../../../components/button';
import { setLoginFormValues } from '../../../store/actions/authActions';
import loginImg from '../../../public/static/imgs/login-image.png';

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

    const welcomeParagraph = 'Vamos iniciar suas compras :)';

    return (
        <StyledLoginForm>
            <section className="login-form-container">
                <header className="login-header">
                    <h2>Seja Bem-vindo</h2>
                    <p>{welcomeParagraph}</p>
                </header>
                <form onSubmit={onSubmit} className="login-form">
                    <div className="login-form-inputs-container">
                        <TextField
                            label='Email'
                            outlined={true}
                            dense={true}>
                                <Input
                                    value={loginForm.email}
                                    onChange={(e) => setFieldValue('email', e.target.value)} />
                        </TextField>
                        <TextField
                            label='Senha'
                            outlined={true}
                            dense={true}>
                                <Input
                                    type="password"
                                    value={loginForm.password}
                                    onChange={(e) => setFieldValue('password', e.target.value)} />
                        </TextField>
                    </div>
                    <div className="login-form-buttons-container">
                        <StyledSuccessButton type="submit" className="submit-button">
                            Entrar
                        </StyledSuccessButton>
                        <nav className="register-link-container">
                            <p>Não tem uma conta?</p>
                            <a href="#">Cadastre-se</a>
                        </nav>
                    </div>
                </form>
                <footer className="login-footer">
                    <p>
                        Direitos reservados a zero veneno produtos orgânicos
                    </p>
                </footer>
            </section>
            <section className="login-img-container">
                <img
                 src={loginImg}
                 alt="Imagem de frutas para login" />
            </section>
        </StyledLoginForm>
    )

}

const mapStateToProps = store => ({
    loginForm: store.authState.loginForm,
})

export default connect(mapStateToProps)(LoginFormComponent);
