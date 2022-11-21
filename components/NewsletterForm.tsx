import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInput } from './FormInput';

const NewsletterFormSchema = yup.object().shape({
	email: yup.string().email().required(),
});

type NewsletterForm = yup.InferType<typeof NewsletterFormSchema>;

export const NewsletterForm = () => {
	const { register, handleSubmit, formState } = useForm<NewsletterForm>({
		resolver: yupResolver(NewsletterFormSchema),
	});

	const onSubmit: SubmitHandler<NewsletterForm> = async (data) => {
		const res = await fetch('/api/newsletter', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: data.email }),
		});
		const x = await res.json();

		console.log(x);
	};

	return (
		<aside className="my-8 max-w-2xl self-center rounded-lg border border-gray-200 bg-white p-4 shadow-md  sm:p-6 lg:p-8">
			<h3 className="mb-3 text-xl font-medium text-gray-900">Dołącz do naszego {`newsletter'a`} i zgarnij 10% rabatu!</h3>
			<p className="mb-5 text-sm font-medium text-gray-500">
				Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter and you will be
				among the first to find out about new features, components, versions, and tools
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3 flex flex-col items-end gap-4 sm:flex-row sm:gap-2">
					<div className="relative w-full">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
						</div>
						<input
							className={`
								block w-full rounded-lg border ${
									!formState.errors.email ? 'border-gray-300' : 'border-2 border-red-300'
								} bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500`}
							placeholder="Twój adres mailowy..."
							{...register('email')}
						/>
					</div>
					<div className="h-full w-full sm:w-auto">
						<button className="h-full w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 ">
							Dołącz
						</button>
					</div>
				</div>
			</form>
		</aside>
	);
};
