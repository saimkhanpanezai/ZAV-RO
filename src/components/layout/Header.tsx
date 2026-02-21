import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useCartStore } from '../../stores/cart';
import { useWishlistStore } from '../../stores/wishlist';
import { useAuthStore } from '../../stores/auth';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Shirts', path: '/shop?category=Shirts' },
    { name: 'Pants', path: '/shop?category=Pants' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-black"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-serif font-bold tracking-widest text-black">
          <img 
            src="https://i.ibb.co/G42xNkqh/Your-paragraph-text-removebg-preview.png" 
            alt="ZAVERO" 
            className="h-12 w-auto object-contain"
          />
          <span>ZAVERO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium uppercase tracking-wide hover:text-gold-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="text-black hover:text-gold-600 transition-colors">
            <Search size={20} />
          </button>
          
          <Link to={user ? "/account" : "/login"} className="text-black hover:text-gold-600 transition-colors">
            <User size={20} />
          </Link>

          <Link to="/waitlist" className="hidden md:block text-black hover:text-gold-600 transition-colors relative">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <button 
            onClick={toggleCart}
            className="text-black hover:text-gold-600 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 lg:hidden p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-serif font-bold">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg font-medium uppercase tracking-wide border-b border-gray-100 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-gray-100">
                <Link to="/login" className="block py-2 text-sm uppercase font-medium">Account</Link>
                <Link to="/wishlist" className="block py-2 text-sm uppercase font-medium">Wishlist</Link>
                <Link to="/contact" className="block py-2 text-sm uppercase font-medium">Contact Us</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
