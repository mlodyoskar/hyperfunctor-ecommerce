import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Product } from '../../components/Product';
import { InferGetStaticPathsType } from '../../types';
import { serialize } from 'next-mdx-remote/serialize';
import { apolloClient } from '../../graphql/client';
import {
	GetProductDetailsBySlugDocument,
	GetProductDetailsBySlugQuery,
	GetProductDetailsBySlugQueryVariables,
	GetProductsListSlugsDocument,
	GetProductsListSlugsQuery,
} from '../../generated/graphql';

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
	const { data } = await apolloClient.query<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>({
		variables: { slug: params?.slug },
		query: GetProductDetailsBySlugDocument,
	});

	if (!data.product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product: {
				...data.product,
				description: await serialize(data.product.description),
			},
		},
	};
};

export const getStaticPaths = async () => {
	const { data } = await apolloClient.query<GetProductsListSlugsQuery>({
		query: GetProductsListSlugsDocument,
	});

	return {
		paths: data.products.map(({ slug }) => ({ params: { slug } })),
		fallback: 'blocking',
	};
};

export default ProductPage;
