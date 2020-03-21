import axios from 'axios';

export class PromotionService {

    findAllFromUser() {
        return axios.get('/promotion/all');
    }

}

let productServiceInstance = null;

// Singleton class
export const promotionInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new PromotionService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()
