import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlistStore } from '../stores/wishlist';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { Heart } from 'lucide-react';

export function Waitlist() {
  const { items } = useWishlistStore();

  // We need to map the wishlist items to the Product interface expected by ProductCard
  // Since WishlistItem is a subset, we might need to fetch full details or adjust the type.
  // However, ProductCard expects a Product object.
  // Our WishlistItem has: id, name, price, image, slug, category.
  // ProductCard expects: id, name, slug, price, sale_price, images, category, sizes, colors.
  
  // For now, let's mock the missing fields or update the store to save them.
  // Ideally, we should fetch the full product details by ID, but for this mock app, 
  // we can just reconstruct a minimal product object or update the store.
  // Let's update the store in the previous step? No, I already created it.
  // Let's just cast it for now or provide defaults.
  
  const mapWishlistItemToProduct = (item: any) => ({
    ...item,
    images: [item.image],
    sizes: [], // Placeholder
    colors: [], // Placeholder
    sale_price: null, // We might lose sale price info if not stored
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Waitlist</h1>
          <p className="text-gray-500">Items you are waiting for.</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <Heart size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">Your waitlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Browse our collection and add items to your waitlist to keep track of them.
            </p>
            <Link to="/shop">
              <Button className="bg-black text-white hover:bg-gold-400 border-none px-8 py-3">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {items.map((item) => (
              <ProductCard key={item.id} product={mapWishlistItemToProduct(item)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
