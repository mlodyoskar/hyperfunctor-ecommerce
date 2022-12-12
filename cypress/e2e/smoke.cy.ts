export {};

describe('Smoke tests', () => {
	it('Checks if header is visible on main page', () => {
		cy.visit('/');
		cy.get('h1').should('have.text', 'Understand User Flow.Increase Conversion.');
	});
});
