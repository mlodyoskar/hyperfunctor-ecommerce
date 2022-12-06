import clsx from 'clsx';
import LoadingSpinner from '../public/oval.svg';

interface Props {
	children: React.ReactNode;
	onClick: () => void;
	isLoading?: boolean;
}

export const Button = ({ children, isLoading, ...props }: Props) => {
	return (
		<button
			{...props}
			disabled={isLoading}
			className={clsx(
				'flex w-full items-center justify-center rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring active:text-red-500',
				{ ' cursor-not-allowed opacity-60 hover:bg-red-600': isLoading },
			)}
		>
			{isLoading && <LoadingSpinner className="mr-4" />} {children}
		</button>
	);
};
