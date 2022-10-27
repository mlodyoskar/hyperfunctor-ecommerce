import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DefaultSeo } from 'next-seo';

interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <>
      <DefaultSeo
        title="hyperfunctor.com | Ecommerce Shop"
        description="This is website of ecommerce shop done with tutorial"
        canonical="https://hyperfunctor-ecommerce.vercel.app/"
      />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
