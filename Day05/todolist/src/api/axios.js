import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.220.93.143:8080',
  params : {userId: 'USER_10'},
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;