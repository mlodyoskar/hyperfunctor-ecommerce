import Image from 'next/image';
import { useCartStore } from '../../context/CartContext';
import { MarkdownContent } from '../../types/types';
import { Markdown } from '../Markdown';
import { ProductReview } from './ProductReview';
import { useState } from 'react';
import { ReviewModal } from '../Modals/ReviewModal';
import { GetProductDetailsBySlugQuery } from '../../generated/graphql';

export type Product = Omit<NonNullable<GetProductDetailsBySlugQuery['product']>, 'description'> & {
	description: MarkdownContent;
};

interface Props {
	product: Product;
}

export const Product = ({ product }: Props) => {
	// const { addItemToCart } = useCartStore();
	// const [reviewModalOpen, setReviewModalOpen] = useState(false);

	if (!product) {
		return <h1>Nie znalazłem produktu</h1>;
	}

	return (
		<div className="relative mx-auto max-w-screen-xl px-4 py-8">
			<div>
				<h1 className="text-2xl font-bold lg:text-3xl">{product.name}</h1>

				<p className="mt-1 text-sm text-gray-500">SKU: #012345</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-4 lg:items-start">
				<div className="lg:col-span-3">
					<div className="relative mt-4 bg-white">
						<Image
							alt={product.name}
							src={product.images[0].url}
							className="h-72 w-full rounded-xl object-contain lg:h-[540px]"
							width={300}
							height={300}
						/>

						<div className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
							<svg
								className="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
								/>
							</svg>

							<span className="ml-1.5 text-xs"> Hover to zoom </span>
						</div>
					</div>
				</div>

				<div className="lg:sticky lg:top-0">
					<form className="space-y-4 lg:pt-8">
						<fieldset>
							<legend className="text-lg font-bold">Color</legend>

							<div className="mt-2 flex gap-1">
								<label htmlFor="color_green" className="cursor-pointer">
									<input type="radio" id="color_green" name="color" className="peer sr-only" />

									<span className="block h-6 w-6 rounded-full border border-gray-200 bg-green-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
								</label>

								<label htmlFor="color_blue" className="cursor-pointer">
									<input type="radio" id="color_blue" name="color" className="peer sr-only" />

									<span className="block h-6 w-6 rounded-full border border-gray-200 bg-blue-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
								</label>

								<label htmlFor="color_pink" className="cursor-pointer">
									<input type="radio" id="color_pink" name="color" className="peer sr-only" />

									<span className="block h-6 w-6 rounded-full border border-gray-200 bg-pink-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
								</label>

								<label htmlFor="color_red" className="cursor-pointer">
									<input type="radio" id="color_red" name="color" className="peer sr-only" />

									<span className="block h-6 w-6 rounded-full border border-gray-200 bg-red-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
								</label>

								<label htmlFor="color_indigo" className="cursor-pointer">
									<input type="radio" id="color_indigo" name="color" className="peer sr-only" />

									<span className="block h-6 w-6 rounded-full border border-gray-200 bg-indigo-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
								</label>
							</div>
						</fieldset>

						<fieldset>
							<legend className="text-lg font-bold">Material</legend>

							<div className="mt-2 flex gap-1">
								<label htmlFor="material_cotton" className="cursor-pointer">
									<input type="radio" id="material_cotton" name="material" className="peer sr-only" />

									<span className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100">
										Cotton
									</span>
								</label>

								<label htmlFor="material_wool" className="cursor-pointer">
									<input type="radio" id="material_wool" name="material" className="peer sr-only" />

									<span className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100">
										Wool
									</span>
								</label>
							</div>
						</fieldset>

						<div className="rounded border bg-gray-100 p-4">
							<p className="text-sm">
								<span className="block"> Pay as low as $3/mo with 0% APR. </span>
							</p>
						</div>

						<div>
							<p className="text-xl font-bold">${product.price / 100}</p>
						</div>

						{/* <button
							onClick={(e) => {
								e.preventDefault();
								// addItemToCart({
								// 	id: product.slug,
								// 	price: product.price,
								// 	title: product.name,
								// 	images: product.images.map((img) => img.url),
								// });
							}}
							className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
						> */}
						{/* Add to cart
						</button> */}

						{product.reviews.length > 0 && (
							<button
								type="button"
								className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide"
								// onClick={() => setReviewModalOpen(true)}
							>
								Przeczytaj opinie
							</button>
						)}

						{/* <ReviewModal reviews={product.reviews} open={reviewModalOpen} setOpen={setReviewModalOpen} /> */}
					</form>
				</div>

				<div className="lg:col-span-3">
					<div className="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl">
						{/* <Markdown content={product.description} /> */}
					</div>
				</div>
			</div>
			{/* <ProductReview productSlug={product.slug} /> */}
		</div>
	);
};
