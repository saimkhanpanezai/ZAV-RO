import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { MOCK_PRODUCTS, supabase } from '../lib/supabase';
import { Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  // Fetch products from Supabase if available
  useEffect(() => {
    async function fetchProducts() {
      if (supabase) {
        let query = supabase.from('products').select('*');
        
        if (selectedCategory) {
           query = query.eq('category', selectedCategory); 
        }
        
        const { data, error } = await query;
        
        if (data && !error && data.length > 0) {
          // Map Supabase data to our Product interface
          const mappedProducts = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            sale_price: p.sale_price,
            category: 'Shirts', // Fallback or fetch real category name
            images: p.images || [],
            sizes: p.sizes || [],
            colors: p.colors || [],
            is_featured: p.is_featured
          }));
          setProducts(mappedProducts);
        }
      }
    }
    // fetchProducts(); 
    // Keeping mock data for stability in preview without keys
  }, [selectedCategory]);

  // Filter logic (Client-side for mock data)
  useEffect(() => {
    let filtered = MOCK_PRODUCTS;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    filtered = filtered.filter(p => {
      const price = p.sale_price || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    setProducts(filtered);
  }, [selectedCategory, priceRange]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const categories = ['Shirts', 'Pants', 'Accessories'];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Shop Collection</h1>
          <p className="text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button 
            className="md:hidden flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 text-sm font-medium hover:text-gold-600">
              <span>Sort by: Featured</span>
              <ChevronDown size={16} />
            </button>
            {/* Dropdown would go here */}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchParams({});
                    }}
                    className={`text-sm hover:text-gold-600 ${!selectedCategory ? 'font-bold text-black' : 'text-gray-600'}`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSearchParams({ category: cat });
                      }}
                      className={`text-sm hover:text-gold-600 ${selectedCategory === cat ? 'font-bold text-black' : 'text-gray-600'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-black"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50">
              <h3 className="text-xl font-serif mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
