import axios from 'axios';
import environment from '../public/static/env.json';

export class AuthService {

    axiosInstance = axios.create({
        baseURL: 'https://viacep.com.br/ws',
    });

    login({ email, password }) {

        const body = {
            password,
            login: email,
            CLIENT_ID: environment.CLIENT_ID,
            CLIENT_SECRET: environment.CLIENT_SECRET,
        }

        return axios.post('/oauth/auth', body)
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.user));
                localStorage.setItem('auth', res.token);
                return res;
            });

    }

    save(body) {
        return axios.post('/oauth/auth/user/register', body)
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.user));
                localStorage.setItem('auth', res.token);
                return res;
            });
    }

    refreshToken() {
        return axios.post('/oauth/auth/user/refresh-token')
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.user));
                localStorage.setItem('auth', res.token);
                return res;
            })
            .catch(() => {
                localStorage.removeItem('auth');
                return err;
            });
    }

    logoff() {
        return axios.delete('/oauth/auth/logoff')
            .then(res => {
                localStorage.removeItem('userData');
                localStorage.removeItem('auth');
                return res;
            })
            .catch(err => {
                localStorage.removeItem('userData');
                localStorage.removeItem('auth');
                return err;
            });
    }

    forgotPassword() {
        return axios.put('/oauth/auth/user/forgot-password');
    }

    findCep(cep) {
        return this.axiosInstance.get(`/${cep}/json/`);
    }

}

let productServiceInstance = null;

// Singleton class
export const authInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new AuthService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()
