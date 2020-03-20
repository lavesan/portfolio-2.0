import axios from 'axios';
import environment from '../public/static/env.json';

export class AuthService {

    login({ email, password }) {

        const body = {
            password,
            login: email,
            CLIENT_ID: environment.CLIENT_ID,
            CLIENT_SECRET: environment.CLIENT_SECRET,
        }

        return axios.post('/oauth/auth', body)
            .then(res => {
                localStorage.setItem('auth', res.token);
            });

    }

    refreshToken() {
        return axios.post('/oauth/auth/user/refresh-token')
            .then(res => {
                localStorage.setItem('auth', res.token);
            })
            .catch(() => {
                localStorage.removeItem('auth');
            });
    }

    logoff() {
        localStorage.removeItem('auth')
        return axios.delete('/oauth/auth/logoff');
    }

    forgotPassword() {
        return axios.put('/oauth/auth/user/forgot-password');
    }

}
