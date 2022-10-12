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
    <section className="bg-gray-50 flex flex-col max-w-7xl mx-auto">
      <div className="mb-4">
        <span className="inline-block h-1 w-12 bg-red-700"></span>

        <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-wide lg:text-3xl">
          All products
        </h2>
      </div>
      <ProductList products={data} />
    </section>
  );
};

export default Home;
