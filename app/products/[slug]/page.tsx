/* eslint-disable @typescript-eslint/ban-ts-comment */
import { serialize } from 'next-mdx-remote/serialize';
import { Product } from '../../../components/Product/Product';
import {
	GetProductDetailsBySlugDocument,
	GetProductDetailsBySlugQuery,
	GetProductDetailsBySlugQueryVariables,
} from '../../../generated/graphql';
import { apolloClient } from '../../../graphql/client';

const ProductPage = async ({ params }: { params: { slug: string } }) => {
	const { data } = await apolloClient.query<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>({
		variables: { slug: params?.slug },
		query: GetProductDetailsBySlugDocument,
	});

	const product = {
		...data.product,
		description: await serialize(data!.product!.description),
	};
	return (
		<section>
			<Product product={product} />
		</section>
	);
};

export default ProductPage;
