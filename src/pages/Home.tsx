import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { MOCK_PRODUCTS } from '../lib/supabase';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, Instagram, Mail } from 'lucide-react';

export function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.is_featured).slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.slice(0, 4).reverse(); // Just mocking new arrivals

  return (
    <div className="space-y-12 md:space-y-24 pb-12 md:pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/1t7VP13p/shirt-mockup-concept-with-plain-clothing-23-2149448751.avif"
            alt="Luxury Fashion"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl space-y-4 md:space-y-8"
          >
            <span className="text-gold-400 uppercase tracking-[0.2em] font-medium text-xs md:text-sm border-l-2 border-gold-400 pl-4">
              New Collection 2026
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
              Elegance in <br /> Every Stitch
            </h1>
            <p className="text-sm md:text-xl text-gray-200 max-w-lg font-light leading-relaxed">
              Discover our latest collection of premium shirts and tailored trousers. 
              Designed for the modern connoisseur who values presence over noise.
            </p>
            <div className="pt-4 md:pt-8 flex space-x-3 md:space-x-4">
              <Link to="/shop">
                <Button className="bg-white text-black hover:bg-gold-400 hover:text-white border-none px-6 py-2 text-sm md:px-8 md:py-3 md:text-base h-auto">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black px-6 py-2 text-sm md:px-8 md:py-3 md:text-base h-auto">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-8 border-y border-gray-100 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 justify-center md:justify-start text-center md:text-left">
            <div className="p-2 md:p-3 bg-gray-50 rounded-full">
              <Truck className="text-gold-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xs md:text-lg">Fast Delivery</h4>
              <p className="text-[10px] md:text-sm text-gray-500 hidden md:block">Nationwide delivery</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 justify-center md:justify-start text-center md:text-left">
            <div className="p-2 md:p-3 bg-gray-50 rounded-full">
              <ShieldCheck className="text-gold-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xs md:text-lg">Secure Payment</h4>
              <p className="text-[10px] md:text-sm text-gray-500 hidden md:block">100% secure checkout</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 justify-center md:justify-start text-center md:text-left">
            <div className="p-2 md:p-3 bg-gray-50 rounded-full">
              <RefreshCw className="text-gold-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xs md:text-lg">Easy Returns</h4>
              <p className="text-[10px] md:text-sm text-gray-500 hidden md:block">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold">Selected for you</span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold mt-2">Featured Products</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center space-x-2 text-sm font-medium hover:text-gold-600 transition-colors group">
            <span>View All</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* The Art of Presence (Story Section) */}
      <section className="bg-black text-white py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              <span className="text-gold-400 uppercase tracking-widest text-xs md:text-sm font-bold">The Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                True Luxury is Not Loud.<br/>It is Felt.
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-sm md:text-lg font-light">
                <p>
                  At ZAVERO, we do not create garments for trends. We create pieces for legacy.
                  Our story began with a simple belief: that clothing should not be rushed, 
                  and it should not be disposable.
                </p>
                <p>
                  It is the weight of fabric that falls perfectly on the shoulders.
                  It is the silence of precise stitching.
                  It is the confidence that enters a room before you speak.
                </p>
                <p className="text-white font-medium italic">
                  "We design for the man who understands presence."
                </p>
              </div>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black mt-4 w-full md:w-auto">
                  Explore Our Philosophy
                </Button>
              </Link>
            </div>
            <div className="relative h-[300px] md:h-[600px] w-full order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Man in Suit" 
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-gold-400/30 hidden md:block" />
              <div className="absolute -top-6 -right-6 w-48 h-48 border border-white/10 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <Link to="/shop?category=Shirts" className="group relative h-[300px] md:h-[600px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop" 
              alt="Shirts" 
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-4 left-4 md:bottom-12 md:left-12 text-white">
              <span className="uppercase tracking-widest text-[10px] md:text-xs font-bold mb-1 md:mb-2 block text-gold-400">Signature Series</span>
              <h3 className="text-xl md:text-4xl font-serif font-bold mb-2 md:mb-4">The Royal Shirt Collection</h3>
              <span className="inline-flex items-center space-x-2 text-xs md:text-sm border-b border-white pb-1 group-hover:border-gold-400 group-hover:text-gold-400 transition-colors">
                <span>Shop Now</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
          <Link to="/shop?category=Pants" className="group relative h-[300px] md:h-[600px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop" 
              alt="Pants" 
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-4 left-4 md:bottom-12 md:left-12 text-white">
              <span className="uppercase tracking-widest text-[10px] md:text-xs font-bold mb-1 md:mb-2 block text-gold-400">Collection</span>
              <h3 className="text-xl md:text-4xl font-serif font-bold mb-2 md:mb-4">Tailored Trousers</h3>
              <span className="inline-flex items-center space-x-2 text-xs md:text-sm border-b border-white pb-1 group-hover:border-gold-400 group-hover:text-gold-400 transition-colors">
                <span>Shop Now</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-bold">Fresh from the Atelier</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mt-2">New Arrivals</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={`new-${product.id}`} product={product} />
          ))}
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <Link to="/shop">
            <Button variant="outline" className="px-8">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-serif font-bold">Client Experiences</h2>
          </div>
          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto pb-4 md:pb-0 snap-x">
            {[
              {
                text: "The quality of the fabric is unlike anything I've worn before. It feels substantial yet breathable. Truly a masterpiece.",
                author: "James Sterling",
                role: "CEO, Sterling & Co."
              },
              {
                text: "ZAVERO has completely redefined my wardrobe. The fit is impeccable, straight off the rack. I feel more confident walking into meetings.",
                author: "Michael Chen",
                role: "Architect"
              },
              {
                text: "Customer service was exceptional. They guided me through the sizing process and the delivery was faster than expected.",
                author: "David Ross",
                role: "Creative Director"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 relative min-w-[85vw] md:min-w-0 snap-center">
                <div className="text-gold-400 mb-4 flex">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed text-sm md:text-base">"{review.text}"</p>
                <div>
                  <p className="font-bold font-serif">{review.author}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
