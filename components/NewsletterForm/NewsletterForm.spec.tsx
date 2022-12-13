import { act, fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { NewsletterFormView } from './NewsletterForm';

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

		const input = screen.getByPlaceholderText(`Twój adres mailowy...`);
		const button = screen.getByText(`Dołącz`);
		act(() => {
			fireEvent.change(input, { target: { value: 'valide@xample.com' } });
			fireEvent.click(button);
		});

		await waitFor(() => expect(doSubmit).not.toHaveBeenCalled());
	});

	it('submit the form when button is clicked and input is filled with valid email', async () => {
		const doSubmit = jest.fn();

		render(<NewsletterFormView doSubmit={doSubmit} />);

		const input = screen.getByPlaceholderText(`Twój adres mailowy...`);
		fireEvent.change(input, { target: { value: 'valid@example.com' } });
		const button = screen.getByText(`Dołącz`);
		fireEvent.click(button);

		await waitFor(() => expect(doSubmit).toHaveBeenCalled());
	});
});
