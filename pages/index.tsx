import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ProductAPIResponse, ProductList } from '../components/ProductList';
import { fetcher } from '../utils/fetcher';

const Home = () => {
  const { data, isLoading } = useQuery(['products'], () =>
    fetcher<ProductAPIResponse[]>('/products')
  );

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-50">
      <h1>All products</h1>
      <ProductList products={data} />
    </section>
  );
};

export default Home;
