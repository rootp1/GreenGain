import axios from 'axios';

export const api1 = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

// Add response interceptor to handle authentication errors
api1.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Log the authentication failure for debugging
			console.error('Authentication failed:', {
				url: error.config?.url,
				method: error.config?.method,
				status: error.response?.status,
				data: error.response?.data
			});
		}
		return Promise.reject(error);
	}
);

export const api2 = axios.create({
	baseURL: process.env.NEXT_PUBLIC_ML_MODEL_URL || 'http://localhost:5000',
	headers: { 'Content-Type': 'application/json' },
});

export const predictSpecies = async (imageUrl) => {
	try {
		const response = await api2.get('/predict', { params: { url: imageUrl } });
		return response.data?.species || 'Unknown';
	} catch (e) {
		console.error('Prediction failed', e);
		return 'Prediction failed';
	}
};
