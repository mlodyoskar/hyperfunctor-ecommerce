import { StripeWebhookEvents } from './../../types/stripe-types';
import { type NextApiHandler } from 'next';

const WEBHOOK_SECRET = 'whsec_0aefedab3b0d9c57f7558763eba6ba1253f33e8be7e0f58c8e0e7d98613c6eb0';

const handler: NextApiHandler = async (req, res) => {
	const event = req.body as StripeWebhookEvents;

	switch (event.type) {
		case '': {
			console.log('X');
		}
	}

	res.status(204).end();
};

export default handler;
