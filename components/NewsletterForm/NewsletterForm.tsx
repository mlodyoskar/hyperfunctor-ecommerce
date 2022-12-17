import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { fetcher } from '../../utils/fetcher';
import { FormInput } from '../FormInput';
import { NewsletterSuccessModal } from '../Modals/NewsletterSuccessModal';

const NewsletterFormSchema = yup.object().shape({
	email: yup.string().email('Podano nieprawidłowy adres email').required('To pole jest wymagane'),
});

type NewsletterForm = yup.InferType<typeof NewsletterFormSchema>;

export const NewsletterForm = () => {
	const doSubmit = async (data: NewsletterForm) => {
		await fetcher('/api/newsletter', {
			body: { email: data.email },
		});
	};

	return <NewsletterFormView doSubmit={doSubmit} />;
};

interface NewsletterFormViewProps {
	doSubmit: (data: NewsletterForm) => Promise<void>;
}

export const NewsletterFormView = ({ doSubmit }: NewsletterFormViewProps) => {
	const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
	const { register, handleSubmit, formState } = useForm<NewsletterForm>({
		resolver: yupResolver(NewsletterFormSchema),
	});

	const onSubmit: SubmitHandler<NewsletterForm> = async (data) => {
		await doSubmit(data);
		setNewsletterModalOpen(true);
	};

	return (
		<aside className="my-8 max-w-2xl self-center rounded-lg border border-gray-200 bg-white p-4 shadow-md  sm:p-6 lg:p-8">
			<h3 className="mb-3 text-xl font-medium text-gray-900">Dołącz do naszego {`newsletter'a`} i zgarnij 10% rabatu!</h3>
			<p className="mb-5 text-sm font-medium text-gray-500">
				Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter and you will be
				among the first to find out about new features, components, versions, and tools
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3 flex flex-col items-center gap-4 sm:flex-row sm:gap-2">
					<div className="relative w-full">
						<FormInput errorMessage={formState.errors.email?.message} placeholder="john@doe.com" {...register('email')}>
							Twój email
						</FormInput>
					</div>
					<div className="h-full w-full sm:w-auto">
						<button className="h-full w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 ">
							Dołącz
						</button>
					</div>
				</div>
			</form>
			<NewsletterSuccessModal open={newsletterModalOpen} setOpen={setNewsletterModalOpen} />
		</aside>
	);
};
