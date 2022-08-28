
import axios from 'axios';

const calendarApi = axios.create({
    baseURL: "http://localhost:8085/api/v1"
});

export default calendarApi;