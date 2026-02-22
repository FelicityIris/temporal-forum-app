import axios from "axios";

// axiosInstance
const api = axios.create({
    baseURL : "http://localhost:5050/api"
});

export default api;