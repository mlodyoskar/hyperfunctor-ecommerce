import { FormInput } from '../FormInput';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { apolloClient } from "./../../graphql/client"


const REQUIRED_FIELD_ERROR = 'To pole jest wymagane';

type StarsCount = '1' | '2' | '3' | '4' | '5';

export const ProductReview = () => {
	const ReviewFormSchema = yup.object().shape({
		firstAndLastName: yup.string().required(REQUIRED_FIELD_ERROR),
		emailAddress: yup.string().email().required(REQUIRED_FIELD_ERROR),
		starsCount: yup.mixed<StarsCount>().oneOf(['1', '2', '3', '4', '5']),
		reviewText: yup.string().min(20).required(REQUIRED_FIELD_ERROR),
	});

	type ReviewForm = yup.InferType<typeof ReviewFormSchema>;

	const { register, handleSubmit, formState } = useForm<ReviewForm>({
		resolver: yupResolver(ReviewFormSchema),
    });
    const x = apolloClient =

	const onSubmit: SubmitHandler<ReviewForm> = (data) => console.log(data);

	console.log(formState);
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
					<div className="lg:col-span-2 lg:py-12">
						<p className="max-w-xl text-lg">
							At the same time, the fact that we are wholly owned and totally independent from manufacturer and other group
							control gives you confidence that we will only recommend what is right for you.
						</p>

						<div className="mt-8">
							<a href="" className="text-2xl font-bold text-red-600">
								0151 475 4450
							</a>

							<address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
						</div>
					</div>

					<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div>
								<FormInput
									errorMessage={formState.errors.firstAndLastName?.message}
									{...register('firstAndLastName')}
									srOnly={true}
									placeholder="Imię i nazwisko"
								>
									Imię i nazwisko
								</FormInput>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<FormInput
										errorMessage={formState.errors.emailAddress?.message}
										{...register('emailAddress')}
										srOnly={true}
										placeholder="Adres e-mail"
									>
										Adres e-mail
									</FormInput>
								</div>

								<div>
									<label htmlFor="countries" className="sr-only">
										Select an option
									</label>
									<select
										{...register('starsCount')}
										id="countries"
										className="mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm  shadow-sm"
									>
										<option selected disabled>
											Ilość gwiazdek
										</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
							</div>

							<div>
								<label className="sr-only" htmlFor="message">
									Message
								</label>
								<textarea
									className="w-full rounded-lg border-gray-200 p-3 text-sm"
									placeholder="Treść recenzji"
									rows={8}
									id="message"
									{...register('reviewText')}
								></textarea>
							</div>

							<div className="mt-4">
								<button
									type="submit"
									className="inline-flex w-full items-center justify-center rounded-lg bg-red-700 px-5 py-3 text-white sm:w-auto"
								>
									<span className="font-medium"> Dodaj recenzję </span>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="ml-3 h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
