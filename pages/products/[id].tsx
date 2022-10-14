import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Product } from '../../components/Product';
import { ProductAPIResponse } from '../../components/ProductList';
import { InferGetStaticPathsType } from '../../types';
import { fetcher } from '../../utils/fetcher';

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section>
      <Product product={product} />
    </section>
  );
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  const product = await fetcher<ProductAPIResponse>(`/products/${params?.id}`);

  return { props: { product } };
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking',
  };
};

export default ProductPage;
