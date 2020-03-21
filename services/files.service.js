import axios from 'axios';

export class FilesService {

    getTermOfContract() {
        return axios.get('/files/term-of-contract');
    }

}

let productServiceInstance = null;

// Singleton class
export const filesInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new FilesService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()
