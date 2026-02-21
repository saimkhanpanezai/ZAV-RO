import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          {/* Brand */}
          <Link to="/" className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src="https://i.ibb.co/NgvDvBNY/Your-paragraph-text-1.png" 
                alt="ZAVERO" 
                className="h-16 w-auto object-contain"
              />
              <span className="text-2xl font-serif font-bold tracking-widest text-white">ZAVERO</span>
            </div>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Redefining luxury with minimal aesthetics and premium craftsmanship. 
            Designed for the modern individual who values quality over quantity.
          </p>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/zavero.io/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="https://www.youtube.com/@zavero.official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Youtube size={24} /></a>
            <a href="https://www.threads.com/@zavero.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Threads">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.5 0 2.9-.5 4.1-1.4" />
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                <path d="M15.5 12v3.5a2.5 2.5 0 1 0 5 0V12" />
              </svg>
            </a>
            <a href="https://whatsapp.com/channel/0029Vb6srGEEQIaqSCmcuy1h" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16 text-center md:text-left">
          {/* Shop */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-serif font-medium mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop?category=Shirts" className="hover:text-white transition-colors">Shirts</Link></li>
              <li><Link to="/shop?category=Pants" className="hover:text-white transition-colors">Pants</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/shop?new-arrivals=true" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/waitlist" className="hover:text-white transition-colors">Join Waitlist</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-serif font-medium mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm text-gray-400 text-center md:text-right">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} ZAVERO. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
