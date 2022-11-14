import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

const REQUIRED_FIELD_ERROR = 'To pole jest wymagane';

export const Checkout = () => {
	const CheckoutFormSchema = yup.object().shape({
		firstName: yup.string().required(REQUIRED_FIELD_ERROR),
		lastName: yup.string().required(REQUIRED_FIELD_ERROR),
		emailAddress: yup.string().email().required(REQUIRED_FIELD_ERROR),
		// TODO: Write your own validation for that
		phoneNumber: yup.string().required(REQUIRED_FIELD_ERROR),
		cardNumber: yup.string().required(REQUIRED_FIELD_ERROR),
		expirationDate: yup.string().required(REQUIRED_FIELD_ERROR),
		// TODO: Write your own validation for that
		CVC: yup.string().required(REQUIRED_FIELD_ERROR),
		country: yup.string().required(REQUIRED_FIELD_ERROR),
		// TODO: Write your own validation for that
		postCode: yup.string().required(REQUIRED_FIELD_ERROR),
	});

	type CheckoutForm = yup.InferType<typeof CheckoutFormSchema>;

	const { register, handleSubmit, formState } = useForm<CheckoutForm>({
		resolver: yupResolver(CheckoutFormSchema),
	});

	const onSubmit: SubmitHandler<CheckoutForm> = (data) => console.log(data);

	console.log(formState);

	return (
		<div className="bg-white py-12 md:py-24">
			<div className="mx-auto max-w-lg px-4 lg:px-8">
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-4">
					<div className="col-span-3">
						<FormInput {...register('firstName')} placeholder={'Michael'} errorMessage={formState.errors.firstName?.message}>
							Imię
						</FormInput>
					</div>
					<div className="col-span-3">
						<FormInput {...register('lastName')} placeholder={'Jordan'} errorMessage={formState.errors.lastName?.message}>
							Nazwisko
						</FormInput>
					</div>

					<div className="col-span-6">
						<FormInput
							{...register('emailAddress')}
							type="email"
							placeholder={'michael.jordan@bulls.com'}
							errorMessage={formState.errors.emailAddress?.message}
						>
							E-mail
						</FormInput>
					</div>

					<div className="col-span-6">
						<FormInput
							{...register('phoneNumber')}
							placeholder={'785-153-370'}
							errorMessage={formState.errors.phoneNumber?.message}
						>
							Numer telefonu
						</FormInput>
					</div>

					<fieldset className="col-span-6">
						<legend className="mb-1 block text-sm text-gray-600">Dane karty kredytowej</legend>

						<div className="-space-y-px rounded-lg bg-white shadow-sm">
							<div>
								<label className="sr-only" htmlFor="card-number">
									Card Number
								</label>

								<input
									className={clsx('relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10', {
										'border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500':
											formState.errors.cardNumber?.message,
									})}
									type="text"
									id="card-number"
									placeholder="Numer karty"
									{...register('cardNumber')}
								/>
							</div>

							<div className="flex -space-x-px">
								<div className="flex-1">
									<label className="sr-only" htmlFor="card-expiration-date">
										Expiration Date
									</label>

									<input
										className={clsx(
											'relative w-full rounded-bl-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10',
											{
												'border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500':
													formState.errors.expirationDate?.message,
											},
										)}
										type="text"
										id="card-expiration-date"
										placeholder="MM / YY"
										{...register('expirationDate')}
									/>
								</div>

								<div className="flex-1">
									<label className="sr-only" htmlFor="card-cvc">
										CVC
									</label>

									<input
										className={clsx(
											'relative w-full rounded-br-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10',
											{
												'border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500':
													formState.errors.CVC?.message,
											},
										)}
										type="text"
										id="card-cvc"
										placeholder="CVC"
										{...register('CVC')}
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
									autoComplete="country-name"
									{...register('country')}
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
									className={clsx('relative w-full rounded-b-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10', {
										'border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500':
											formState.errors.postCode?.message,
									})}
									type="text"
									id="postal-code"
									autoComplete="postal-code"
									placeholder="Kod pocztowy"
									{...register('postCode')}
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
	);
};
