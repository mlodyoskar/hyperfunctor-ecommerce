import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductList } from '../../../components/ProductList';
import { GetProductsListDocument } from '../../../generated/graphql';
import { apolloClient } from '../../../graphql/client';
import { InferGetStaticPathsType } from '../../../types/types';

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<section className="mx-auto flex max-w-7xl flex-col bg-gray-50">
			<div className="mb-4">
				<span className="inline-block h-1 w-12 bg-red-700"></span>

				<h2 className="mt-1 text-2xl font-extrabold uppercase tracking-wide lg:text-3xl">All products</h2>
			</div>
			<ProductList products={data} />
		</section>
	);
};

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
	const page = params?.page;
	const { data } = await apolloClient.query({
		query: GetProductsListDocument,
	});

	if (!data.products || data.products.length <= 1) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: data.products,
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
