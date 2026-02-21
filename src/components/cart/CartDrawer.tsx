import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../stores/cart';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold">Shopping Cart ({items.length})</h2>
              <button onClick={toggleCart} className="text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <p className="text-gray-500">Your cart is empty.</p>
                  <Button variant="outline" onClick={toggleCart}>Continue Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden rounded-md">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Size: {item.size} | Color: {item.color}
                            {item.fabric && <span className="block mt-0.5">Fabric: {item.fabric}</span>}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">Subtotal</span>
                  <span className="text-lg font-bold">{formatCurrency(total())}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <div className="space-y-3">
                  <Link to="/checkout" onClick={toggleCart}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                  <Link to="/cart" onClick={toggleCart}>
                    <Button variant="outline" className="w-full">View Cart</Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
