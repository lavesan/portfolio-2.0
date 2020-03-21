import axios from 'axios';

export class CommentService {

    getComments() {
        return axios.get(`/comment/all`);
    }

}

let productServiceInstance = null;

// Singleton class
export const commentInstance = (() => {

    const getInstance = () => {
        if (!productServiceInstance)
            productServiceInstance = new CommentService();

        return productServiceInstance;
    }

    return {
        getInstance,
    }

})()
