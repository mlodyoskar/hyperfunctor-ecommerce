import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const REQUIRED_FIELD_ERROR = 'To pole jest wymagane';

export const Checkout = () => {
	// const CheckoutFormSchema = z
	// 	.object({
	// 		firstName: z.string(),
	// 		lastName: z.string(),
	// 		// emailAddress: z.string().email(),
	// 		// TODO: Write your own validation for that
	// 		phoneNumber: z.string(),
	// 		cardNumber: z.string(),
	// 		expirationDate: z.string(),
	// 		// TODO: Write your own validation for that
	// 		CVC: z.string(),
	// 		country: z.string(),
	// 		// TODO: Write your own validation for that
	// 		postCode: z.string(),
	// 	})
	// 	.required();

	// type CheckoutForm = z.infer<typeof CheckoutFormSchema>;

	const CheckoutFormSchema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		emailAddress: yup.string().email().required(),
		// TODO: Write your own validation for that
		phoneNumber: yup.string().required(),
		cardNumber: yup.string().required(),
		expirationDate: yup.string().required(),
		// TODO: Write your own validation for that
		CVC: yup.string().required(),
		country: yup.string().required(),
		// TODO: Write your own validation for that
		postCode: yup.string().required(),
	});

	type CheckoutForm = yup.InferType<typeof CheckoutFormSchema>;

	const { register, handleSubmit, formState, watch } = useForm<CheckoutForm>({
		resolver: yupResolver(CheckoutFormSchema),
	});

	console.log(watch());

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
										className="relative w-full rounded-br-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
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
									className="relative w-full rounded-b-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
									type="text"
									id="postal-code"
									autoComplete="postal-code"
									placeholder="ZIP/Post Code"
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
