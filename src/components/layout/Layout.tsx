import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-black bg-white">
      <Header />
      <CartDrawer />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
