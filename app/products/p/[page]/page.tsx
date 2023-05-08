import { ProductList } from '../../../../components/ProductList';
import { GetProductsListDocument, GetProductsListQuery } from '../../../../generated/graphql';
import { apolloClient } from '../../../../graphql/client';

const ProductsPage = async () => {
	const { data } = await apolloClient.query<GetProductsListQuery>({
		query: GetProductsListDocument,
	});

	return (
		<section className="mx-auto flex max-w-7xl flex-col bg-gray-50">
			<div className="mb-4">
				<span className="inline-block h-1 w-12 bg-red-700"></span>

				<h2 className="mt-1 text-2xl font-extrabold uppercase tracking-wide lg:text-3xl">All products</h2>
			</div>
			<ProductList products={data.products} />
		</section>
	);
};

export default ProductsPage;
