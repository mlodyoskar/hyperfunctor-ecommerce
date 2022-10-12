import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main className="min-h-screen">
          <Component {...pageProps} />
        </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
