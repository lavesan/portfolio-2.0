import axios from 'axios';

export class CategoryService {

    getAll() {
        return axios.get(`/category/tree/all`);
    }

}

let productServiceInstance = null;

// Singleton class
export const categoryInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new CategoryService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()