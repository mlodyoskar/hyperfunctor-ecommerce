import { ProductAPIResponse } from './../components/ProductList';
import { fetcher } from './fetcher';

export const getProducts = async (page = 1, perPage = 25) => {
	const offSet = page * perPage - perPage;
	const products = await fetcher<ProductAPIResponse[] | null>(`/products?take=${perPage}&offset=${offSet}`);

	return products;
};
