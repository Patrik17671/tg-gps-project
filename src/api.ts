import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY || "";
const baseUrl = process.env.REACT_APP_BASE_URL || "";

export const getCoordinates = async (address: string) => {
	const response = await axios.get(baseUrl, {
		params: {
			q: address,
			limit: 1,
			appid: API_KEY,
		},
	});
	return response.data[0];
};