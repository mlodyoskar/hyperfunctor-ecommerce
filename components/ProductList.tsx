import Image from 'next/image';
import Link from 'next/link';
import { GetProductsListQuery } from '../generated/graphql';

export const ProductList = ({ products }: { products: GetProductsListQuery['products'] }) => {
	return (
		<div className="grid gap-x-4 gap-y-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => {
				return (
					<Link href={`/products/${product.slug}`} key={product.id} className="block">
						<div className="bg-white">
							<Image
								alt={product.name}
								src={product.images[0].url}
								className="-mt-3 h-[350px] w-full object-contain sm:h-[450px]"
								width={400}
								height={400}
							/>
						</div>
						<h5 className="mt-4 text-sm text-gray-700">{product.name}</h5>
						<div className="mt-4 flex items-center justify-between font-medium">
							<p>${product.price / 100}</p>
							<p className="text-xs uppercase tracking-wide">Rating: 5</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
