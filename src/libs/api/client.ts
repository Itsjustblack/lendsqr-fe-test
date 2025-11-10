import axios from "axios";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor to append key parameter to every request
apiClient.interceptors.request.use((config) => {
	config.params = {
		...config.params,
		key: import.meta.env.VITE_API_PRIVATE_KEY,
	};
	return config;
});

export default apiClient;
