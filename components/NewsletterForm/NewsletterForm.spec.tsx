import { act, fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { NewsletterFormView } from './NewsletterForm';

const INPUT_PLACEHOLDER = 'john@doe.com';

describe('Newsletter form', () => {
	beforeEach(() => {
		const mockIntersectionObserver = jest.fn();

		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
	});

	it('should not submit the form when button is clicked and input is empty', async () => {
		const doSubmit = jest.fn();
		render(<NewsletterFormView doSubmit={doSubmit} />);

		const button = screen.getByText(`Dołącz`);
		fireEvent.click(button);

		await waitFor(() => expect(doSubmit).not.toHaveBeenCalled());
	});

	it('should not submit the form when button is clicked and input is filled with wrong email', async () => {
		const doSubmit = jest.fn();

		render(<NewsletterFormView doSubmit={doSubmit} />);

		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
		const button = screen.getByText(`Dołącz`);
		act(() => {
			fireEvent.change(input, { target: { value: 'valide@xample.com' } });
			fireEvent.click(button);
		});

		expect(doSubmit).not.toHaveBeenCalled();
	});

	it('submit the form when button is clicked and input is filled with valid email', async () => {
		const doSubmit = jest.fn();
		render(<NewsletterFormView doSubmit={doSubmit} />);

		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
		fireEvent.change(input, { target: { value: 'valid@example.com' } });
		const button = screen.getByText(`Dołącz`);
		fireEvent.click(button);

		await waitFor(() => expect(doSubmit).toHaveBeenCalled());
	});

	it('should show error message about empty email', async () => {
		const doSubmit = jest.fn();
		render(<NewsletterFormView doSubmit={doSubmit} />);

		const button = screen.getByText(`Dołącz`);
		fireEvent.click(button);

		expect(await screen.findByText('To pole jest wymagane')).toBeInTheDocument();
	});

	it('should show error message about wrong email when invalid email', async () => {
		const doSubmit = jest.fn();
		render(<NewsletterFormView doSubmit={doSubmit} />);

		const button = screen.getByText(`Dołącz`);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
		fireEvent.change(input, { target: { value: 'example.com' } });
		fireEvent.click(button);

		expect(await screen.findByText('Podano nieprawidłowy adres email')).toBeInTheDocument();
	});

	it('should show confirmation modal when succeded', async () => {
		const doSubmit = jest.fn();
		render(<NewsletterFormView doSubmit={doSubmit} />);

		const button = screen.getByText(`Dołącz`);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
		fireEvent.change(input, { target: { value: 'example@example.com' } });
		fireEvent.click(button);

		expect(await screen.findByText('Dziękujemy za zapisanie się do newslettera!')).toBeInTheDocument();
	});
});
