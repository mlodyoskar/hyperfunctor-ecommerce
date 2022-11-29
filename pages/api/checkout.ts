import { invariant } from '@apollo/client/utilities/globals';
import { NextApiHandler } from 'next';
import { Stripe } from 'stripe';

const handler: NextApiHandler = async (req, res) => {
	const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
	invariant(stripeSecretKey, 'STRIPE_SECRET_KEY is missing');

	const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

	const stripeCheckoutSession = await stripe.checkout.sessions.create({
		mode: 'payment',
		locale: 'pl',
		payment_method_types: ['card', 'p24', 'blik'],
		success_url: 'http://localhost:3000',
		cancel_url: 'http://localhost:3000',
		line_items: [
			{
				quantity: 3,
				price_data: {
					currency: 'PLN',
					unit_amount: 2137,
					product_data: { name: 'Mój produkt', description: 'Meega fajny produkt' },
				},
			},
		],
	});

	if (!stripeCheckoutSession.url) {
		res.status(500).json({ message: 'Something went wrong' });
		return;
	}

	res.status(201).redirect(stripeCheckoutSession.url).json({ session: stripeCheckoutSession });
};

export default handler;
