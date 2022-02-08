import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_TASK,
    headers:{
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('user');
    config.headers.Authorization = token ? `Bearer ${token}` : ``;
    return config;
})

export default instance;