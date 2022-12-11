import { useSession } from 'next-auth/react';
import React from 'react';
import { FormInput } from '../components/FormInput';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetcher } from '../utils/fetcher';
import { useRouter } from 'next/router';

const REQUIRED_FIELD_ERROR = 'To pole jest wymagane';

export const SignUpFormSchema = yup.object().shape({
	email: yup.string().email().required(REQUIRED_FIELD_ERROR),
	password: yup.string().min(8, 'Minimalna długość hasła to 8 znaków').required(REQUIRED_FIELD_ERROR),
	passwordConfirmation: yup.string().required(REQUIRED_FIELD_ERROR),
});

export type SignUpForm = yup.InferType<typeof SignUpFormSchema>;

const SignupPage = () => {
	const { status } = useSession();
	const router = useRouter();
	const { register, handleSubmit, formState } = useForm<SignUpForm>({
		resolver: yupResolver(SignUpFormSchema),
	});
	const onSubmit: SubmitHandler<SignUpForm> = async ({ email, password }) => {
		await fetcher('/api/signup', {
			body: {
				email: email,
				password: password,
			},
		});
		if (status === 'authenticated') {
			router.push('/');
		}
	};

	return (
		<section className="bg-white">
			<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
				<aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
					<img
						alt="Pattern"
						src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
						className="absolute inset-0 h-full w-full object-cover"
					/>
				</aside>

				<main
					aria-label="Main"
					className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
				>
					<div className="max-w-xl lg:max-w-3xl">
						<h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Zarejestruj się 🦑</h1>

						<p className="mt-4 leading-relaxed text-gray-500">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam, quibusdam aperiam
							voluptatum.
						</p>

						<form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
							<div className="col-span-6">
								<FormInput
									errorMessage={formState.errors.email?.message}
									{...register('email')}
									placeholder="email@example.com"
								>
									Adres email
								</FormInput>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<FormInput errorMessage={formState.errors.password?.message} {...register('password')} type="password">
									Hasło
								</FormInput>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<FormInput
									errorMessage={formState.errors.passwordConfirmation?.message}
									{...register('passwordConfirmation')}
									type="password"
								>
									Potwierdzenie hasła
								</FormInput>
							</div>
							{/* {TODO: Handle this with RHF and Hygraph} */}
							<div className="col-span-6">
								<label htmlFor="MarketingAccept" className="flex gap-4">
									<input
										type="checkbox"
										id="MarketingAccept"
										name="marketing_accept"
										className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
									/>

									<span className="text-sm text-gray-700">
										I want to receive emails about events, product updates and company announcements.
									</span>
								</label>
							</div>
							<div className="col-span-6">
								<p className="text-sm text-gray-500">
									By creating an account, you agree to our{' '}
									<a href="#" className="text-gray-700 underline">
										terms and conditions
									</a>{' '}
									and{' '}
									<a href="#" className="text-gray-700 underline">
										privacy policy
									</a>
									.
								</p>
							</div>
							<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
								<button className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500">
									Stwórz konto
								</button>

								<p className="mt-4 text-sm text-gray-500 sm:mt-0">
									Masz juz konto?{' '}
									<a href="#" className="text-gray-700 underline">
										Zaloguj się
									</a>
									.
								</p>
							</div>
						</form>
					</div>
				</main>
			</div>
		</section>
	);
};

export default SignupPage;
