import axios from 'axios';

const intance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL
})

export default intance;