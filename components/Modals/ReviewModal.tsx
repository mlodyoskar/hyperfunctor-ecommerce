import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
}

export const ReviewModal = ({ open, setOpen }: Props) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="relative sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-600 sm:mx-0 sm:h-10 sm:w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="h-6 w-6 text-white"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
												/>
											</svg>
										</div>
										<div className=" mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
												(4) Wszystkie opinie
											</Dialog.Title>
											<button className="absolute top-0 right-0" onClick={() => setOpen(false)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="h-6 w-6"
												>
													<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
												</svg>

												<span className="sr-only">Close modal</span>
											</button>
											<div className="mt-4 max-h-[34rem] overflow-scroll px-4 md:max-h-96">
												<div>
													<p className="text-bold m-0">Micheal Jordan</p>
													<p className="mb-2 text-xs text-gray-700">July 12, 2021</p>
													<p className="text-sm text-gray-700">
														Kurtka warta swojej ceny, jest świetna. Polecam brać rozmiar mniejszy niż zwykle. Ja mam 174cm i XS jest
														idealna. Jeśli ktoś woli bardziej over to rozmiar S. Należy pamiętać, iż jest to kurtka krótka tzn.
														podczas schylania będzie widać lędźwie.
													</p>
													<hr className="my-2 h-px border-0 bg-gray-300"></hr>
												</div>
												<div>
													<p className="text-bold m-0">Micheal Jordan</p>
													<p className="mb-2 text-xs text-gray-700">July 12, 2021</p>
													<p className="text-sm text-gray-700">
														Kurtka warta swojej ceny, jest świetna. Polecam brać rozmiar mniejszy niż zwykle. Ja mam 174cm i XS jest
														idealna. Jeśli ktoś woli bardziej over to rozmiar S. Należy pamiętać, iż jest to kurtka krótka tzn.
														podczas schylania będzie widać lędźwie.
													</p>
													<hr className="my-2 h-px border-0 bg-gray-300"></hr>
												</div>
												<div>
													<p className="text-bold m-0">Micheal Jordan</p>
													<p className="mb-2 text-xs text-gray-700">July 12, 2021</p>
													<p className="text-sm text-gray-700">
														Kurtka warta swojej ceny, jest świetna. Polecam brać rozmiar mniejszy niż zwykle. Ja mam 174cm i XS jest
														idealna. Jeśli ktoś woli bardziej over to rozmiar S. Należy pamiętać, iż jest to kurtka krótka tzn.
														podczas schylania będzie widać lędźwie.
													</p>
													<hr className="my-2 h-px border-0 bg-gray-300"></hr>
												</div>
												<div>
													<p className="text-bold m-0">Micheal Jordan</p>
													<p className="mb-2 text-xs text-gray-700">July 12, 2021</p>
													<p className="text-sm text-gray-700">
														Kurtka warta swojej ceny, jest świetna. Polecam brać rozmiar mniejszy niż zwykle. Ja mam 174cm i XS jest
														idealna. Jeśli ktoś woli bardziej over to rozmiar S. Należy pamiętać, iż jest to kurtka krótka tzn.
														podczas schylania będzie widać lędźwie.
													</p>
													<hr className="my-2 h-px border-0 bg-gray-300"></hr>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
