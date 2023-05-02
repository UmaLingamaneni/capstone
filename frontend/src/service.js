import axios from 'axios';
import { toast } from 'react-toastify';

// PRODUCTION: http://13.50.235.148:4000/api/v1/
// DEVELOPMENT: http://localhost:4000/api/v1/
// PRODUCTION: https://api.servicees.cabtab.in/api/v1/
const service = axios.create({
  baseURL: 'http://13.50.235.148:4000/api/v1/'
});

service.defaults.timeout = 100000;

service.interceptors.request.use(
  (config) => {
    const { url } = config;
    config.headers['Content-Type'] = 'application/json';
    config.headers.withCredentials = true;

    const authToken = localStorage.getItem('token');
    config.headers.auth = authToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error.response.data);
    if (error.response.status === 500) {
      toast.error(error.response.data.error.message);
    } else if (error.response.status === 403) {
      toast.error(error.response.data.error.message);
    } else if (error.response.status === 404) {
      toast.error(error.response.data.error.message);
    } else if (error.response.status === 400) {
      toast.error(error.response.data.error.message);
    } else if (error.response.status === 409) {
      toast.error(error.response.data.error.message);
    } else if (error.response.status === 401) {
      toast.error(error.response.data.error.message);
      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);

export default service;
