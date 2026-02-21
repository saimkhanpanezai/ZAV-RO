import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Package, Users, ShoppingBag, Plus, Edit, Trash, X, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  is_featured: boolean;
}

interface SiteSettings {
  id?: string;
  shipping_policy: string;
  warranty_policy: string;
  return_policy: string;
}

export function Admin() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    shipping_policy: 'Standard shipping applies.',
    warranty_policy: 'Standard warranty applies.',
    return_policy: 'Standard return policy applies.',
  });
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'settings') {
      fetchSettings();
    }
  }, [activeTab]);

  async function fetchSettings() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (data && !error) {
      setSettings(data);
    } else if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
      console.error('Error fetching settings:', error);
    }
    setLoading(false);
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      toast.success('Settings saved (local only)');
      return;
    }

    setLoading(true);
    
    // Check if settings exist
    const { data: existing } = await supabase.from('site_settings').select('id').single();
    
    let error;
    if (existing) {
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({
          shipping_policy: settings.shipping_policy,
          warranty_policy: settings.warranty_policy,
          return_policy: settings.return_policy,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('site_settings')
        .insert([{
          shipping_policy: settings.shipping_policy,
          warranty_policy: settings.warranty_policy,
          return_policy: settings.return_policy
        }]);
      error = insertError;
    }

    if (error) {
      toast.error('Failed to save settings');
      console.error(error);
    } else {
      toast.success('Settings saved successfully');
    }
    setLoading(false);
  }

  async function fetchProducts() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (data && !error) {
      const mappedProducts = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        sale_price: p.sale_price,
        category: 'Shirts', // Placeholder if category is not in DB or is ID
        images: p.images || [],
        sizes: p.sizes || [],
        colors: p.colors || [],
        is_featured: p.is_featured
      }));
      setProducts(mappedProducts);
    } else if (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  }

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const isMock = ['1', '2', '3', '4', '5'].includes(id);

    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('Delete error:', error);
        // If it's a real product (not mock) and DB delete fails, stop here.
        // If it's a mock product, we allow local deletion even if DB fails (e.g. if DB isn't set up).
        if (!isMock) {
          toast.error('Failed to delete product');
          return;
        }
      }
    }
    
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAddProduct = () => {
    setEditingProduct({
      name: '',
      slug: '',
      description: '',
      price: 0,
      category: 'Shirts',
      images: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White'],
      is_featured: false
    });
    setShowModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate and save to Supabase
    // For now, we'll just update local state to simulate
    
    if (editingProduct.id) {
      // Update existing
      if (supabase) {
         const { error } = await supabase
          .from('products')
          .update({
            name: editingProduct.name,
            price: editingProduct.price,
            description: editingProduct.description,
            // Add other fields as needed
          })
          .eq('id', editingProduct.id);
          
          if (error) {
            toast.error('Failed to update product');
            return;
          }
      }

      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } as Product : p));
      toast.success('Product updated');
    } else {
      // Create new
      const newProduct = {
        ...editingProduct,
        id: Math.random().toString(36).substr(2, 9), // Temp ID
        slug: editingProduct.name?.toLowerCase().replace(/ /g, '-') || 'new-product',
        images: editingProduct.images?.length ? editingProduct.images : ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'],
      } as Product;

      if (supabase) {
        const { error } = await supabase.from('products').insert([{
            name: newProduct.name,
            slug: newProduct.slug,
            price: newProduct.price,
            description: newProduct.description,
            // other fields
        }]);
        if (error) {
             toast.error('Failed to create product');
             return;
        }
      }
      
      setProducts([...products, newProduct]);
      toast.success('Product created');
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
        <Button onClick={handleAddProduct}>
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'products' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <ShoppingBag size={20} />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <Package size={20} />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'users' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'settings' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-sm overflow-hidden">
          {activeTab === 'products' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">In Stock</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-8 text-center text-gray-500">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <p>No orders found.</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-8 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 opacity-20" />
              <p>No users found.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Store Settings</h2>
              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Policy</label>
                  <textarea 
                    rows={4}
                    value={settings.shipping_policy}
                    onChange={(e) => setSettings({...settings, shipping_policy: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-black focus:ring-0"
                    placeholder="Enter shipping policy details..."
                  />
                  <p className="text-xs text-gray-500 mt-1">This text will appear on the Shipping & Delivery page.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Policy</label>
                  <textarea 
                    rows={4}
                    value={settings.warranty_policy}
                    onChange={(e) => setSettings({...settings, warranty_policy: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-black focus:ring-0"
                    placeholder="Enter warranty policy details..."
                  />
                  <p className="text-xs text-gray-500 mt-1">This text will appear on product pages and warranty sections.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Policy</label>
                  <textarea 
                    rows={4}
                    value={settings.return_policy}
                    onChange={(e) => setSettings({...settings, return_policy: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-black focus:ring-0"
                    placeholder="Enter return policy details..."
                  />
                  <p className="text-xs text-gray-500 mt-1">This text will appear on the Returns page.</p>
                </div>

                <Button type="submit" isLoading={loading}>
                  Save Settings
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">{editingProduct.id ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={editingProduct.name || ''}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input 
                  type="number" 
                  required
                  value={editingProduct.price || ''}
                  onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={editingProduct.category || 'Shirts'}
                  onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-white"
                >
                  <option value="Shirts">Shirts</option>
                  <option value="Pants">Pants</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit">Save Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
