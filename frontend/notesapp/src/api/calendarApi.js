
import axios from 'axios';

const calendarApi = axios.create({
    baseURL: "http://localhost:8085/api/v1"
});

// config interceptors, to add TOKEN all REQUEST
calendarApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };

    return config;
})


export default calendarApi;