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

const handler: NextApiHandler = async (req, res) => {
	console.log(req.body);
	res.status(200).json({ message: 'Elo' });
};

export default handler;
