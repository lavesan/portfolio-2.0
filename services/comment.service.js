import axios from 'axios';

export class CommentService {

    getComments() {
        return axios.get(`/comment/all`);
    }

    saveComment({ userId, briefComment }) {
        return axios.post('/client/comment', { userId, briefComment })
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
