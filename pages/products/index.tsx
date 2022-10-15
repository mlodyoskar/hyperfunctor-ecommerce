import { InferGetStaticPropsType } from 'next';
import { Pagination } from '../../components/Pagination';
import { ProductList } from '../../components/ProductList';
import { getProducts } from '../../utils/getProducts';

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col bg-gray-50">
      <div className="mb-4">
        <span className="inline-block h-1 w-12 bg-red-700"></span>

        <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-wide lg:text-3xl">
          All products
        </h2>
      </div>
      <ProductList products={data} />
      <Pagination page={1} />
    </section>
  );
};

export const getStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      data: products,
    },
  };
};
export default ProductsPage;
