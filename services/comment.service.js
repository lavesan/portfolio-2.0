import axios from 'axios';

export class CommentService {

    getComments() {
        return axios.get(`/comment/all`);
    }

}
