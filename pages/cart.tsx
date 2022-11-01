import { useCartStore } from '../context/CartContext';
import Image from 'next/image';

const CartPage = () => {
	const { items, removeItemFromCart } = useCartStore();

	return (
		<section>
			<h1 className="sr-only">Checkout</h1>

			<div className="relative mx-auto max-w-screen-2xl">
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="bg-gray-50 py-12 md:py-24">
						<div className="mx-auto max-w-lg px-4 lg:px-8">
							<div className="flex items-center">
								<span className="h-10 w-10 rounded-full bg-blue-900"></span>

								<h2 className="ml-4 font-medium">BambooYou</h2>
							</div>

							<div className="mt-8">
								<p className="text-2xl font-medium tracking-tight">$99.99</p>
								<p className="mt-1 text-sm text-gray-500">For the purchase of</p>
							</div>
							<div className="mt-12">
								<div className="flow-root">
									<ul className="-my-4 divide-y divide-gray-200">
										{items.map(({ item, count }) => (
											<li key={item.id} className="flex items-center justify-between py-4">
												<div className="flex items-start">
													<Image
														width={400}
														height={300}
														alt="Trainer"
														src="https://images.unsplash.com/photo-1565299999261-28ba859019bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
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
														${item.price / 100}
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
							</div>
						</div>
					</div>

					<div className="bg-white py-12 md:py-24">
						<div className="mx-auto max-w-lg px-4 lg:px-8">
							<form className="grid grid-cols-6 gap-4">
								<div className="col-span-3">
									<label className="mb-1 block text-sm text-gray-600" htmlFor="first_name">
										First Name
									</label>

									<input className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm" type="text" id="first_name" />
								</div>

								<div className="col-span-3">
									<label className="mb-1 block text-sm text-gray-600" htmlFor="last_name">
										Last Name
									</label>

									<input className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm" type="text" id="last_name" />
								</div>

								<div className="col-span-6">
									<label className="mb-1 block text-sm text-gray-600" htmlFor="email">
										Email
									</label>

									<input className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm" type="email" id="email" />
								</div>

								<div className="col-span-6">
									<label className="mb-1 block text-sm text-gray-600" htmlFor="phone">
										Phone
									</label>

									<input className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm" type="tel" id="phone" />
								</div>

								<fieldset className="col-span-6">
									<legend className="mb-1 block text-sm text-gray-600">Card Details</legend>

									<div className="-space-y-px rounded-lg bg-white shadow-sm">
										<div>
											<label className="sr-only" htmlFor="card-number">
												Card Number
											</label>

											<input
												className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
												type="text"
												name="card-number"
												id="card-number"
												placeholder="Card number"
											/>
										</div>

										<div className="flex -space-x-px">
											<div className="flex-1">
												<label className="sr-only" htmlFor="card-expiration-date">
													Expiration Date
												</label>

												<input
													className="relative w-full rounded-bl-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
													type="text"
													name="card-expiration-date"
													id="card-expiration-date"
													placeholder="MM / YY"
												/>
											</div>

											<div className="flex-1">
												<label className="sr-only" htmlFor="card-cvc">
													CVC
												</label>

												<input
													className="relative w-full rounded-br-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
													type="text"
													name="card-cvc"
													id="card-cvc"
													placeholder="CVC"
												/>
											</div>
										</div>
									</div>
								</fieldset>

								<fieldset className="col-span-6">
									<legend className="mb-1 block text-sm text-gray-600">Billing Address</legend>

									<div className="-space-y-px rounded-lg bg-white shadow-sm">
										<div>
											<label className="sr-only" htmlFor="country">
												Country
											</label>

											<select
												className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm focus:z-10"
												id="country"
												name="country"
												autoComplete="country-name"
											>
												<option>Poland</option>
												<option>England</option>
												<option>Belgium</option>
												<option>Japan</option>
											</select>
										</div>

										<div>
											<label className="sr-only" htmlFor="postal-code">
												ZIP/Post Code
											</label>

											<input
												className="relative w-full rounded-b-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												placeholder="ZIP/Post Code"
											/>
										</div>
									</div>
								</fieldset>

								<div className="col-span-6">
									<button className="block w-full rounded-lg bg-black p-2.5 text-sm text-white" type="submit">
										Pay Now
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CartPage;
