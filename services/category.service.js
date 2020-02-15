import axios from 'axios';

export class CategoryService {

    getAll() {
        return axios.get(`category/tree/all`);
    }

}