import axios from 'axios';

const tokenString = localStorage.getItem('token');
const userToken = JSON.parse(tokenString);


axios.defaults.baseURL = '/api/'
axios.defaults.headers.common = {'Authorization': `Bearer ${userToken}`}

export default axios;