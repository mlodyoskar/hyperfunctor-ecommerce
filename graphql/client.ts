import { ApolloClient, InMemoryCache } from '@apollo/client';

const NEXT_PUBLIC_HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!NEXT_PUBLIC_HYGRAPH_ENDPOINT) {
	throw new Error("NEXT_PUBLIC_HYGRAPH_ENDPOINT wasn't provided");
}

export const apolloClient = new ApolloClient({
	ssrMode: true,
	uri: NEXT_PUBLIC_HYGRAPH_ENDPOINT,
	cache: new InMemoryCache(),
});
