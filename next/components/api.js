import axios from 'axios';

export const api1 = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API1_URL || 'https://api-jdcq.onrender.com',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export const api2 = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API2_URL || 'https://ml-pzt6.onrender.com',
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
