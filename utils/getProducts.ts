import { ProductAPIResponse } from './../components/ProductList';
import { fetcher } from './fetcher';

export const getProducts = (page = '1', perPage = 25) => {
  const offSet = parseInt(page) * perPage - perPage;
  const products = fetcher<ProductAPIResponse[]>(
    `/products?take=${perPage}&offset=${offSet}`
  );

  return products;
};
