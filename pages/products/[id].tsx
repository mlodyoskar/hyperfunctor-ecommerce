import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Product } from '../../components/Product';
import { ProductAPIResponse } from '../../components/ProductList';
import { InferGetStaticPathsType } from '../../types';
import { fetcher } from '../../utils/fetcher';
import { serialize } from 'next-mdx-remote/serialize';

const ProductPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<section>
			<Product product={product} />
		</section>
	);
};

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
	const product = await fetcher<ProductAPIResponse | null>(`/products/${params?.id}`);

	if (!product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product: {
				...product,
				longDescription: await serialize(product.longDescription),
			},
		},
	};
};

export const getStaticPaths = async () => {
	return {
		paths: Array.from({ length: 50 }, (_, idx) => ({
			params: {
				id: (idx + 1).toString(),
			},
		})),
		fallback: 'blocking',
	};
};

export default ProductPage;
