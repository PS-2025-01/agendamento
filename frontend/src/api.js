import { Axios } from "axios";

export const api = new Axios({
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    transformRequest: [data => JSON.stringify(data)],
    transformResponse: [data => JSON.parse(data)]
})

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);