import {
	GetProductBySlugDocument,
	GetProductBySlugQuery,
	GetProductBySlugQueryVariables,
} from './../../generated/graphql';
import { invariant } from '@apollo/client/utilities/globals';
import { NextApiHandler } from 'next';
import { Stripe } from 'stripe';
import { z } from 'zod';
import { apolloClient } from '../../graphql/client';

const BodySchema = z
	.object({
		slug: z.string(),
		count: z.number(),
	})
	.array();

type BodyType = z.infer<typeof BodySchema>;

const parseBody = (body: unknown): BodyType => {
	try {
		BodySchema.parse(body);
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw new Error('Parsing failed');
		}
	}
	return body as BodyType;
};

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Use POST method' });
	}

	const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
	const VERCEL_URL = process.env.VERCEL_URL;

	const APP_URL = VERCEL_URL ? `https://${VERCEL_URL}` : 'http://localhost:3000';
	invariant(stripeSecretKey, 'STRIPE_SECRET_KEY is missing');

	const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });
	const body = parseBody(req.body);

	const productsToBuy = await Promise.all(
		body.map(async (product) => {
			const { data, error } = await apolloClient.query<GetProductBySlugQuery, GetProductBySlugQueryVariables>({
				variables: { slug: product.slug },
				query: GetProductBySlugDocument,
			});

			if (error) {
				res.status(500).json({ message: error.message });
				throw new Error(error.message);
			}
			if (!data.product) {
				res.status(500).json({ message: `Product with slug ${product.slug} was not found` });
				throw new Error(`Product with slug ${product.slug} was not found`);
			}

			return { product: data.product, count: product.count };
		}),
	);

	const stripeCheckoutSession = await stripe.checkout.sessions.create({
		mode: 'payment',
		locale: 'pl',
		payment_method_types: ['card', 'p24', 'blik'],
		success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${APP_URL}/checkout/canceled`,
		line_items: productsToBuy.map(({ product, count }) => ({
			quantity: count,
			price_data: {
				currency: 'pln',
				unit_amount: product.price,
				product_data: {
					name: product.name,
					images: product.images.map((img) => img.url),
					description: product.description,
				},
			},
		})),
	});

	if (!stripeCheckoutSession.url) {
		res.status(500).json({ message: 'Something went wrong' });
		return;
	}

	res.status(201).json({ session: stripeCheckoutSession });
};

export default handler;
