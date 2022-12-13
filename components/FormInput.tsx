import clsx from 'clsx';
import React from 'react';

interface Props {
	children: React.ReactNode;
	errorMessage?: string | undefined;
	srOnly?: boolean;
	placeholder?: string;
	type?: 'text' | 'email' | 'number' | 'textarea';
}

export const FormInput = React.forwardRef<HTMLInputElement, Props>(
	({ children, placeholder, type = 'text', errorMessage, srOnly = false, ...props }, ref) => {
		if (!srOnly) {
			return (
				<>
					<label className="block text-sm text-gray-600">
						{children}
						<input
							{...props}
							type={type}
							placeholder={(!errorMessage && placeholder) || ''}
							className={clsx('mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm', {
								'border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500':
									errorMessage,
							})}
							ref={ref}
						/>
					</label>
					<p className="mt-1 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
				</>
			);
		}
		return (
			<>
				<label className="sr-only block text-sm text-gray-600">{children}</label>
				<input
					{...props}
					type={type}
					placeholder={(!errorMessage && placeholder) || ''}
					className={clsx('mt-1 w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm', {
						'border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500':
							errorMessage,
					})}
					ref={ref}
				/>
				<p className="mt-1 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
			</>
		);
	},
);

FormInput.displayName = 'FormInput';
