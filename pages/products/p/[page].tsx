import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Pagination } from '../../../components/Pagination';
import { ProductList } from '../../../components/ProductList';
import { InferGetStaticPathsType } from '../../../types';
import { getProducts } from '../../../utils/getProducts';

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<section className="mx-auto flex max-w-7xl flex-col bg-gray-50">
			<div className="mb-4">
				<span className="inline-block h-1 w-12 bg-red-700"></span>

				<h2 className="mt-1 text-2xl font-extrabold uppercase tracking-wide lg:text-3xl">All products</h2>
			</div>
			<ProductList products={data} />
			<Pagination />
		</section>
	);
};

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
	const page = params?.page;
	const products = await getProducts(Number(page));

	if (!products || products?.length <= 1) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: products,
		},
	};
};

export const getStaticPaths = async () => {
	return {
		paths: Array.from({ length: 2 }, (_, idx) => ({
			params: {
				page: (idx + 1).toString(),
			},
		})),
		fallback: 'blocking',
	};
};

export default ProductsPage;
