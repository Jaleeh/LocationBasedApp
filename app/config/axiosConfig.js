import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ase2task3.herokuapp.com/api/',
});

export const setAuthToken = token => {
  api.defaults.headers.common.Authorization = `Token ${token}`;
};

// Logging request and response
api.interceptors.request.use(
  request => {
    console.log(request);
    // Edit request config
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    console.log(response);
    // Edit response config
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;
