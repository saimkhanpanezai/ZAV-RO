import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '../../stores/cart';
import { useWishlistStore } from '../../stores/wishlist';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price?: number | null;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      quantity: 1,
      image: product.images[0],
      size: product.sizes[0], // Default to first size
      color: product.colors[0], // Default to first color
      fabric: 'Standard', // Default fabric
    });
    toast.success('Added to cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success('Removed from waitlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.sale_price || product.price,
        image: product.images[0],
        category: product.category,
      });
      toast.success('Added to waitlist');
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center space-x-2 bg-gradient-to-t from-black/50 to-transparent pb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gold-400 hover:text-white transition-colors"
          >
            <ShoppingBag size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg transition-colors ${isWishlisted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-black hover:bg-red-500 hover:text-white'}`}
            onClick={handleWishlist}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </motion.button>
        </div>
        
        {product.sale_price && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
            Sale
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-medium text-gray-900 group-hover:text-gold-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center space-x-2">
          <span className={product.sale_price ? 'text-red-600 font-medium' : 'text-gray-900 font-medium'}>
            {formatCurrency(product.sale_price || product.price)}
          </span>
          {product.sale_price && (
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
