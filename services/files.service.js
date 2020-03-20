import axios from 'axios';

export class FilesService {

    getTermOfContract() {
        return axios.get('/files/term-of-contract');
    }

}