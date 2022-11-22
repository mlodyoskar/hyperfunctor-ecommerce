import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
}

// TODO: Create reusable modal component and put there headlessui boilerplate
export const NewsletterSuccessModal = ({ open, setOpen }: Props) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
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
												Dziękujemy za zapisanie się do newslettera!
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
											<div className="mt-4 max-h-[34rem] max-w-sm md:max-h-[30rem]">
												<p>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt reiciendis nostrum minima accusantium
													deleniti debitis fugiat provident, dolores ab aliquid dolorem dolore ea atque quam delectus commodi
													excepturi ipsum voluptate minus. Natus qui eum unde molestias praesentium voluptatum exercitationem
													similique veritatis accusantium id, deleniti expedita? Ad nisi optio tempora, voluptatem labore placeat
													sunt fugiat saepe quaerat perspiciatis fuga totam quod.
												</p>
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
