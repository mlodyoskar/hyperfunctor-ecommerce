import { invariant } from '@apollo/client/utilities/globals';
import { NextApiHandler } from 'next';
import { Stripe } from 'stripe';

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Use POST method' });
	}

	const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
	const VERCEL_URL = process.env.VERCEL_URL;

	const APP_URL = VERCEL_URL ? `https://${VERCEL_URL}` : 'http://localhost:3000';
	invariant(stripeSecretKey, 'STRIPE_SECRET_KEY is missing');

	const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

	const stripeCheckoutSession = await stripe.checkout.sessions.create({
		mode: 'payment',
		locale: 'pl',
		payment_method_types: ['card', 'p24', 'blik'],
		success_url: `${APP_URL}/checkout/success`,
		cancel_url: `${APP_URL}/checkout/canceled`,
		line_items: req.body,
	});

	if (!stripeCheckoutSession.url) {
		res.status(500).json({ message: 'Something went wrong' });
		return;
	}

	res.status(201).json({ session: stripeCheckoutSession });
};

export default handler;
