import axios from 'axios';

export class FliesService {

    getTermOfContract() {
        return axios.get('files/term-of-contract');
    }

}