const BASE_API_URL = 'https://naszsklep-api.vercel.app/api';

export const fetcher = async <T>(path: string) => {
	const response = await fetch(`${BASE_API_URL}${path}`);
	const data: T = await response.json();
	return data;
};
