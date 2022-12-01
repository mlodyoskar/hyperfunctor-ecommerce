interface Props {
	children: React.ReactNode;
	onClick: () => void;
}

export const Button = ({ children, ...props }: Props) => {
	return (
		<button
			{...props}
			className="inline-block w-full rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
		>
			{children}
		</button>
	);
};
