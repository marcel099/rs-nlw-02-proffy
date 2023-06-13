import axios from 'axios';

const { API_URL } = process.env;

const axiosConfig = {
  baseURL: API_URL,
};

const api = axios.create(axiosConfig);

export default api;
