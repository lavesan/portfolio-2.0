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
            .then(res => new Promise((resolve, reject) => {
                    const isInvalid = Boolean(res.error) || Boolean(res.message);
                    if (isInvalid) {
                        reject(res);
                    } else {
                        localStorage.setItem('userData', JSON.stringify(res.user));
                        localStorage.setItem('auth', res.token);
                        resolve(res);
                    }
                })
            );

    }

    save(body) {
        return axios.post('/oauth/auth/user/register', body)
            .then(res => new Promise((resolve, reject) => {
                const isInvalid = Boolean(res.error);
                if (isInvalid) {
                    reject(res);
                } else {
                    localStorage.setItem('userData', JSON.stringify(res.user));
                    localStorage.setItem('auth', res.token);
                    resolve(res);
                }
            }));
    }

    refreshToken() {
        return axios.post('/oauth/auth/user/refresh-token')
            .then(res => new Promise((resolve, reject) => {
                    const isInvalid = res.status && res.status == 401;
                    if (isInvalid) {
                        reject(res);
                    } else {
                        localStorage.setItem('userData', JSON.stringify(res.user));
                        localStorage.setItem('auth', res.token);
                        resolve(res);
                    }
            }))
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

    forgotPassword({ email }) {
        return axios.put('/oauth/auth/user/forgot-password', { email });
    }

    updateUser(body) {
        return axios.put('/client/user', body);
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
