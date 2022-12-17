import { CART } from '../elements/cart';

export {};

describe('Cart', () => {
	it('Adds product to cart and then check if it is there', () => {
		cy.visit('/');
		cy.get('[data-testid="navbar-link-products"').click();
		cy.get('[data-testid="product-0"]').click();
		cy.contains('Add to cart').click();
		cy.get('[data-testid="cart-counter"]').should('have.text', 1);
		cy.get('[data-testid="navbar-cart"').click();
		cy.get(CART.submitButton).click();
	});
});
