import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';
import { Button } from '../components/ui/Button';
import { Package, User, LogOut, MapPin } from 'lucide-react';

export function Account() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <Package size={20} />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === 'addresses' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            <MapPin size={20} />
            <span>Addresses</span>
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors mt-8"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Content */}
        <div className="flex-1 bg-gray-50 p-8 rounded-sm min-h-[400px]">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Order History</h2>
              <div className="text-center py-12 text-gray-500 bg-white rounded-sm border border-gray-200">
                <Package size={48} className="mx-auto mb-4 opacity-20" />
                <p>You haven't placed any orders yet.</p>
                <Button className="mt-4" onClick={() => navigate('/shop')}>Start Shopping</Button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Profile Details</h2>
              <div className="bg-white p-6 rounded-sm border border-gray-200 space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-lg">{user.full_name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <Button variant="outline" className="mt-4">Edit Profile</Button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Saved Addresses</h2>
              <div className="text-center py-12 text-gray-500 bg-white rounded-sm border border-gray-200">
                <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                <p>No addresses saved.</p>
                <Button variant="outline" className="mt-4">Add New Address</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
