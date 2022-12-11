import { ApolloClient, InMemoryCache } from '@apollo/client';
import { invariant } from '@apollo/client/utilities/globals';

const NEXT_PUBLIC_HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_ACCOUNT_TOKEN = process.env.HYGRAPH_ACCOUNT_TOKEN;

invariant(HYGRAPH_ACCOUNT_TOKEN);
invariant(NEXT_PUBLIC_HYGRAPH_ENDPOINT);

export const authorizedApolloClient = new ApolloClient({
	ssrMode: true,
	uri: NEXT_PUBLIC_HYGRAPH_ENDPOINT,
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer ${HYGRAPH_ACCOUNT_TOKEN}`,
	},
});
