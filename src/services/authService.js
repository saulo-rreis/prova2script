import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/auth/login';

export default {
    login() {
        return axios.post(API_URL);
    }
};
