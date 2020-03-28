import axios from 'axios';

export class ProductService {

    axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
    });

    findProductsFromCategories() {
        return fetch(new Request('http://localhost:3000/product/categories/all',{
            method: 'GET',
            mode: 'cors',
        }))
            .then(res => res.json())
    }
    
    findProductsPromotions() {
        return fetch(new Request('http://localhost:3000/product/promotion/all',{
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

