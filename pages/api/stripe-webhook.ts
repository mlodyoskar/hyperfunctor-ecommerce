import {
	UpdateOrderStatusMutation,
	UpdateOrderStatusMutationVariables,
	UpdateOrderStatusDocument,
	OrderStatus,
} from './../../generated/graphql';
import { invariant } from '@apollo/client/utilities/globals';
import { StripeWebhookEvents } from './../../types/stripe-types';
import { type NextApiHandler } from 'next';
import { authorizedApolloClient } from '../../graphql/authorizedClient';

const handler: NextApiHandler = async (req, res) => {
	const event = req.body as StripeWebhookEvents;
	const WEBHOOK_SECRET = invariant(process.env.STRIPE_WEBHOOK_SECRET);

	switch (event.type) {
		case 'payment_intent.succeeded':
			console.log(event.data.object);
			// await authorizedApolloClient.mutate<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>({
			// 	mutation: UpdateOrderStatusDocument,
			// 	variables: { status: OrderStatus.Processed, orderId:  },
			// });

			console.log(event);

			break;
	}

	res.status(204).end();
};

export default handler;
