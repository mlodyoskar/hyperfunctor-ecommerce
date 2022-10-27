import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};
