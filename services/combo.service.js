import axios from 'axios';

export class ComboService {

    findAll() {
        return axios.get('/combo/all');
    }

}
