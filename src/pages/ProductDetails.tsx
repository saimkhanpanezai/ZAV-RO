import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';
import { useCartStore } from '../stores/cart';
import { toast } from 'react-hot-toast';
import { Star, Truck, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductDetails() {
  const { slug } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedFabric, setSelectedFabric] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [settings, setSettings] = useState<any>(null);
  
  const { addItem } = useCartStore();

  const fabricOptions = [
    {
      id: 'cotton-linen',
      name: 'Cotton Linen Blend',
      description: 'Lightweight, breathable, premium textured finish (perfect for spring).',
    },
    {
      id: 'wash-wear',
      name: 'Premium Wash & Wear',
      description: 'Smooth, wrinkle-resistant, ideal for formal wear.',
    },
    {
      id: 'cotton-twill',
      name: 'Cotton Twill',
      description: 'Durable, structured feel, modern smart-casual look.',
    },
  ];

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
    fetchSettings();
  }, [product]);

  async function fetchSettings() {
    if (!supabase) return;
    const { data } = await supabase.from('site_settings').select('*').single();
    if (data) {
      setSettings(data);
    }
  }

  if (!product) {
    return <div className="container mx-auto py-20 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedFabric) {
      toast.error('Please select a fabric');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      quantity,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      fabric: fabricOptions.find(f => f.id === selectedFabric)?.name || selectedFabric,
    });
    toast.success('Added to cart');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={product.images[activeImage] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-[3/4] bg-gray-100 overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm text-gray-500 uppercase tracking-widest">{product.category}</div>
          <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex text-gold-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-sm text-gray-500">(12 reviews)</span>
          </div>

          <div className="text-2xl font-medium mb-8 flex items-center space-x-3">
            <span className={product.sale_price ? 'text-red-600' : ''}>
              {formatCurrency(product.sale_price || product.price)}
            </span>
            {product.sale_price && (
              <span className="text-gray-400 line-through text-lg">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-8">
            {/* Color Selection */}
            <div>
              <span className="text-sm font-bold uppercase tracking-wide block mb-3">Color: {selectedColor}</span>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${selectedColor === color ? 'border-black' : 'border-gray-200'}`}
                  >
                    <span 
                      className="w-8 h-8 rounded-full border border-gray-100" 
                      style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Selection */}
            <div>
              <span className="text-sm font-bold uppercase tracking-wide block mb-3">Fabric: <span className="text-gray-500 font-normal normal-case ml-1">{selectedFabric ? fabricOptions.find(f => f.id === selectedFabric)?.name : 'Select a fabric'}</span></span>
              <div className="grid grid-cols-1 gap-3">
                {fabricOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFabric(option.id)}
                    className={`relative p-4 border text-left transition-all duration-200 group ${
                      selectedFabric === option.id 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-medium ${selectedFabric === option.id ? 'text-black' : 'text-gray-900'}`}>
                        {option.name}
                      </span>
                      {selectedFabric === option.id && (
                        <div className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold uppercase tracking-wide">Size: {selectedSize}</span>
                <button className="text-xs underline text-gray-500 hover:text-black">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm font-medium transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <div className="w-32 border border-gray-200 flex items-center justify-between px-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>

          <div className="border-t border-gray-100 pt-8 space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck size={20} />
              <span>{settings?.shipping_policy || 'Free shipping on orders over $200'}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Shield size={20} />
              <span>{settings?.warranty_policy || '2 year warranty on all products'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
