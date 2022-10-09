import axios from 'axios';

const baseURL = process.env.API_URL;

const api = axios.create({
  baseURL,
})

export default api;