import axios from 'axios';

export class ComboService {

    findAll() {
        return axios.get('/combo/all');
    }

}

let productServiceInstance = null;

// Singleton class
export const comboInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new ComboService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()
