import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Pagination } from '../../components/Pagination';
import { ProductList } from '../../components/ProductList';
import { getProducts } from '../../utils/getProducts';

const PRODUCTS_PER_PAGE = 25;

const ProductsPage = () => {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = useState(1);
  console.log('PAGE', page);

  useEffect(() => {
    if (!query.page) return;

    if (typeof query.page !== 'string') {
      throw new Error('Invalid page');
    }

    setPage(Number(query.page));
  }, [query.page]);

  const { data, isLoading } = useQuery(['products', page], () =>
    getProducts(page, PRODUCTS_PER_PAGE)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>Nie udało pobrać się danych</div>;
  }

  return (
    <section className="bg-gray-50 flex flex-col  max-w-7xl mx-auto">
      <div className="mb-4">
        <span className="inline-block h-1 w-12 bg-red-700"></span>

        <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-wide lg:text-3xl">
          All products
        </h2>
      </div>
      <ProductList products={data} />
      <Pagination page={page} />
    </section>
  );
};

export default ProductsPage;
