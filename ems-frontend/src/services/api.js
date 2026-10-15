import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

const PUBLIC_URLS = ["login/", "signup/", "token/refresh/"];

api.interceptors.request.use((config) => {
    const isPublic = PUBLIC_URLS.some((u) => config.url.includes(u));
    const token = localStorage.getItem("access");
    if (token && !isPublic) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;