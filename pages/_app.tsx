import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from '../components/Layout';
import { CartStoreContextProvider } from '../context/CartContext';
import { apolloClient } from '../graphql/client';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={apolloClient}>
				<CartStoreContextProvider>
					<QueryClientProvider client={queryClient}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
						<ReactQueryDevtools />
					</QueryClientProvider>
				</CartStoreContextProvider>
			</ApolloProvider>
		</SessionProvider>
	);
}

export default MyApp;
