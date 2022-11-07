import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from '../FormInput';
import { zodResolver } from '@hookform/resolvers/zod';

export const Checkout = () => {
	const CheckoutFormSchema = z.object({
		firstName: z.string(),
		lastName: z.string(),
		emailAddress: z.string().email(),
		// TODO: Write your own validation for that
		phoneNumber: z.string(),
		cardNumber: z.string(),
		expirationDate: z.date(),
		// TODO: Write your own validation for that
		CVC: z.string(),
		country: z.string(),
		// TODO: Write your own validation for that
		postCode: z.string(),
	});

	type CheckoutForm = z.infer<typeof CheckoutFormSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutForm>({ resolver: zodResolver(CheckoutFormSchema) });

	const onSubmit: SubmitHandler<CheckoutForm> = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white py-12 md:py-24">
			<div className="mx-auto max-w-lg px-4 lg:px-8">
				<form className="grid grid-cols-6 gap-4">
					<div className="col-span-3">
						<FormInput {...register('firstName')} placeholder={'Michael'} errorMessage={errors.firstName?.message}>
							First name
						</FormInput>
					</div>
					<div className="col-span-3">
						<FormInput {...register('lastName')} placeholder={'Jordan'} errorMessage={errors.lastName?.message}>
							Last name
						</FormInput>
					</div>

					<div className="col-span-6">
						<FormInput
							{...register('emailAddress')}
							placeholder={'michael.jordan@bulls.com'}
							errorMessage={errors.emailAddress?.message}
						>
							Email
						</FormInput>
					</div>

					<div className="col-span-6">
						<FormInput {...register('phoneNumber')} placeholder={'785-153-370'} errorMessage={errors.phoneNumber?.message}>
							Phone number
						</FormInput>
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
									id="card-number"
									placeholder="Card number"
									{...register('cardNumber')}
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
		</form>
	);
};
