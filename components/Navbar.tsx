import clsx from 'clsx';
import Link from 'next/link';
import { useCartStore } from '../context/CartContext';
// import CartIcon from './Icons/cart.svg';
// import AccountIcon from './Icons/account.svg';

const navigationLinks = [
	{
		text: 'about',
		to: '/about',
	},
	{
		text: 'products',
		to: '/products/p/1',
	},
	{
		text: 'contact',
		to: '/contact',
	},
] as const;

export const Navbar = () => {
	// const { items } = useCartStore();

	return (
		<header className="border-b border-gray-100">
			<div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
				<div className="flex items-center">
					<button type="button" className="p-2 sm:mr-4 lg:hidden">
						<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
					<Link className="flex items-center justify-center" href="/">
						<span className="inline-block font-bold text-red-700">Hyperfunctor</span>
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-end">
					<nav className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500">
						{navigationLinks.map(({ text, to }) => {
							return (
								<Link
									data-testid={`navbar-link-${text}`}
									key={text}
									href={to}
									className={`${clsx(
										// { 'border-current text-red-700': pathname === to },
										'block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700',
									)}`}
								>
									{text}
								</Link>
							);
						})}
					</nav>

					<div className="ml-8 flex items-center">
						<div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
							<span>
								<Link
									data-testid="navbar-cart"
									href="/checkout"
									className="relative block border-b-4 border-transparent p-6 hover:border-red-700"
								>
									{/* {items.length > 0 && (
										<span className="absolute bottom-4 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-red-700 text-center text-sm text-white">
											<span className="sr-only">Items in the cart: </span>
											<span data-testid="cart-counter">{items.length}</span>
										</span>
									)} */}
									{/* <CartIcon className="h-4 w-4" /> */}

									<span className="sr-only">Cart</span>
								</Link>
							</span>

							<span>
								<a href="/account" className="block border-b-4 border-transparent p-6 hover:border-red-700">
									{/* <AccountIcon className="h-4 w-4" /> */}
									<span className="sr-only"> Account </span>
								</a>
							</span>

							<span className="hidden sm:block">
								<a href="/search" className="block border-b-4 border-transparent p-6 hover:border-red-700">
									<svg
										className="h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>

									<span className="sr-only"> Search </span>
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
