import axios from 'axios';
import environment from '../public/static/env.json';

export class ProductService {

    axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
    });

    findProductsFromCategories() {
        return fetch(new Request(`${environment.API_URL}/product/categories/all`,{
            method: 'GET',
            mode: 'cors',
        }))
            .then(res => res.json())
    }
    
    findProductsPromotions() {
        return fetch(new Request(`${environment.API_URL}/product/promotion/all`,{
            method: 'GET',
            mode: 'cors',
        }))
            .then(res => res.json())
    }

    findAllFilteredPaginated({ take = 10, page }, filter) {
        return axios.post(`/product/all?take=${take}&page=${page}`, filter);
    }

}

let productServiceInstance = null;

// Singleton class
export const productInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new ProductService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()

