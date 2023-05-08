'use client';

const ErrorPage = () => {
	return (
		<div className="grid h-screen place-content-center bg-white">
			<div className="text-center">
				<strong className="text-9xl font-black text-gray-200">404</strong>

				<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>

				<p className="mt-4 text-gray-500">We cant find that page.</p>

				<a
					href="#"
					className="mt-6 inline-block rounded bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring"
				>
					Go Back Home
				</a>
			</div>
		</div>
	);
};

export default ErrorPage;
