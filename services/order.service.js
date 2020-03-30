import axios from 'axios';

export class OrderService {

    save(body) {
        return axios.post('/order', body);
    }
    
    confirmOrder(body) {
        return axios.put('/order/confirm', body);
    }

    getFreeTimesFromDate(date) {
        return axios.get(`/order/active-schedule?date=${date}`);
    }

    findAllActiveByIds(orderIds) {
        return axios.post('/order/all/ids', orderIds);
    }

}

let productServiceInstance = null;

// Singleton class
export const orderInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new OrderService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()