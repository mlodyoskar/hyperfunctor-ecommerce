import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from '../components/Layout';
import { CartStoreContextProvider } from '../context/CartContext';

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CartStoreContextProvider>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</CartStoreContextProvider>
	);
}

export default MyApp;
