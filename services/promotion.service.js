import axios from 'axios';

export class PromotionService {

    findAllFromUser() {
        return axios.get('/promotion/all');
    }

}