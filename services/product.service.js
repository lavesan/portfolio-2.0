import axios from 'axios';

class ProductService {

    findProductsFromCategories() {
        return axios.get('/product/categories/all');
    }

    findProductsPromotions() {
        return axios.get('/product/promotion/all');
    }

    findAllFilteredPaginated({ take = 10, page }, filter) {
        return axios.post(`/product/all?take=${take}&page=${page}`, filter);
    }

}

let productServiceInstance = null;

// Singleton class
export default (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new ProductService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()
