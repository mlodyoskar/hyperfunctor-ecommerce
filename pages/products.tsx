import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Pagination } from '../components/Pagination';
import { ProductAPIResponse, ProductList } from '../components/ProductList';
import { getProducts } from '../utils/getProducts';

const PRODUCTS_PER_PAGE = 25;

const ProductsPage = () => {
  const { query } = useRouter();
  const [page, setPage] = useState(query.page || 1);
  const { data, isLoading } = useQuery(['products', page], () =>
    getProducts(1, PRODUCTS_PER_PAGE)
  );

  console.log(query);

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
      <Pagination />
    </section>
  );
};

export default ProductsPage;
