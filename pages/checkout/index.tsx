import { CartItems, useCartStore } from '../../context/CartContext';
import Image from 'next/image';
import { Button } from '../../components/Button';
import { loadStripe } from '@stripe/stripe-js';
import { invariant } from '@apollo/client/utilities/globals';
import Stripe from 'stripe';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../utils/fetcher';

const stripePublishKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
invariant(stripePublishKey, 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing');
const stripePromise = loadStripe(stripePublishKey);

const CheckoutPage = () => {
	const { items, removeItemFromCart } = useCartStore();

	const { mutate, data, isLoading } = useMutation({
		mutationFn: async (items: { slug: string; count: number }[]) => {
			return await fetcher<{ session: Stripe.Response<Stripe.Checkout.Session> }>('api/checkout', {
				body: items,
			});
		},
	});

	const cartPriceSum = items.reduce((acc, obj) => {
		return acc + obj.item.price;
	}, 0);

	const handleCreateOrder = async () => {
		const stripe = await stripePromise;
		invariant(stripe, 'Something went wrong');

		mutate(
			items.map((cartItem) => ({ slug: cartItem.item.id, count: cartItem.count })),
			{
				onSuccess: ({ session }) => {
					stripe.redirectToCheckout({ sessionId: session.id });
				},
			},
		);
	};

	return (
		<section>
			<h1 className="sr-only">Checkout</h1>

			<div className="relative mx-auto max-w-screen-2xl">
				<div className="grid grid-cols-1 md:grid-cols-1">
					<div className="bg-gray-50 py-12 md:py-24">
						<div className="mx-auto max-w-lg px-4 lg:px-8">
							<div className="flex items-center">
								<span className="h-10 w-10 rounded-full bg-blue-900"></span>

								<h2 className="ml-4 font-medium">BambooYou</h2>
							</div>

							<div className="mt-8">
								<p className="text-2xl font-medium tracking-tight">{cartPriceSum / 100} PLN</p>
								<p className="mt-1 text-sm text-gray-500">For the purchase of</p>
							</div>
							<div className="mt-12">
								<div className="mb-10 flow-root">
									<ul className="-my-4 divide-y divide-gray-200">
										{items.map(({ item, count }) => (
											<li key={item.id} className="flex items-center justify-between py-4">
												<div className="flex items-start">
													<Image
														width={400}
														height={300}
														alt={`${item.title} image`}
														src={item.images[0] || ''}
														className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
													/>

													<div className="ml-4">
														<p className="text-sm">{item.title}</p>

														<dl className="mt-1 space-y-1 text-xs text-gray-500">
															<div>
																<dt className="inline">Color:</dt>
																<dd className="inline">Blue</dd>
															</div>

															<div>
																<dt className="inline">Size:</dt>
																<dd className="inline">UK 10</dd>
															</div>
														</dl>
													</div>
												</div>

												<div className="flex flex-col">
													<p className="text-sm">
														{item.price / 100} PLN
														<small className="text-gray-500"> x {count}</small>
													</p>
													<button onClick={() => removeItemFromCart(item.id)} className="self-end text-red-700">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="20"
															height="20"
															fill="currentColor"
															className="bi bi-trash-fill"
															viewBox="0 0 16 16"
														>
															<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
														</svg>
													</button>
												</div>
											</li>
										))}
									</ul>
								</div>
								<Button onClick={handleCreateOrder}>Złóz zamówienie</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CheckoutPage;
