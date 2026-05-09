const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use((config) => {
    if (process.env.API_TOKEN) {
        config.headers.Authorization = `Bearer_${process.env.API_TOKEN}`;
    }
    return config;
});

module.exports = apiClient;
