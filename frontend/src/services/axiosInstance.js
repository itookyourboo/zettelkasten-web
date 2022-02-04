import axios from "redaxios";
import TokenManager from "./TokenManager";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    transformRequest: [
        (data, headers) => {
            headers['Authorization'] = TokenManager.getAuthHeader();

            return JSON.stringify(data);
        }
    ],
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;