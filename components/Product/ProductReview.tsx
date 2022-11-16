import { FormInput } from '../FormInput';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateProductReviewMutation } from '../../generated/graphql';
import { useState } from 'react';
import clsx from 'clsx';
import LoadingSpinner from '../../public/oval.svg';

const REQUIRED_FIELD_ERROR = 'To pole jest wymagane';

const ReviewFormSchema = yup.object().shape({
	firstAndLastName: yup.string().required(REQUIRED_FIELD_ERROR),
	emailAddress: yup.string().email().required(REQUIRED_FIELD_ERROR),
	starsCount: yup.mixed<StarsCount>().oneOf(['1', '2', '3', '4', '5']),
	reviewText: yup.string().min(20).required(REQUIRED_FIELD_ERROR),
});
type ReviewForm = yup.InferType<typeof ReviewFormSchema>;

type StarsCount = '1' | '2' | '3' | '4' | '5';

interface Props {
	productSlug: string;
}

export const ProductReview = ({ productSlug }: Props) => {
	const [createProductReview, createProductReviewResult] = useCreateProductReviewMutation();
	const [reviewAdded, setReviewAdded] = useState(false);

	const { register, handleSubmit, formState } = useForm<ReviewForm>({
		resolver: yupResolver(ReviewFormSchema),
	});

	const onSubmit: SubmitHandler<ReviewForm> = async (data) => {
		await createProductReview({
			variables: {
				review: {
					content: data.reviewText,
					email: data.emailAddress,
					name: data.firstAndLastName,
					rating: Number(data.starsCount),
					//TODO: Change this to exisitng field or make it optional
					headline: 'Opinia',
					product: { connect: { slug: productSlug } },
				},
			},
		});

		setReviewAdded(true);
	};

	return (
		<section>
			<div className="mx-auto max-w-screen-xl py-16 sm:px-6 lg:px-8">
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

					{reviewAdded ? (
						<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
							<div className="flex h-full flex-col items-center justify-center space-y-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-16 w-16 text-red-700"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
									/>
								</svg>

								<p className="text-lg">Dziękujemy za dodanie opini!</p>
							</div>
						</div>
					) : (
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
										{/* //TODO: Make this a component with error handling, maybe even use some type of headlessUI library */}
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
										disabled={createProductReviewResult.loading}
										type="submit"
										className={clsx(
											'inline-flex w-full items-center justify-center rounded-lg bg-red-700 px-5 py-3 text-white sm:w-auto',
											{ 'cursor-not-allowed opacity-60': createProductReviewResult.loading },
										)}
									>
										{createProductReviewResult.loading && <LoadingSpinner className="mr-2" />}
										<span className="font-medium"> Dodaj recenzję </span>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="ml-3 h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
										</svg>
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
