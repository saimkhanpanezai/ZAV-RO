import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '../stores/cart';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(4, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  paymentMethod: z.enum(['card', 'cod']),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const subtotal = total();
  const shippingCost = subtotal > 5000 ? 0 : 300;
  const grandTotal = subtotal + shippingCost;

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: grandTotal,
          subtotal,
          shippingCost,
          paymentMethod: data.paymentMethod,
          items: items,
          ...data
        }),
      });

      if (!response.ok) throw new Error('Payment failed');
      
      const result = await response.json();
      console.log('Order placed:', result);
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/account');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-serif font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input {...register('firstName')} className="w-full px-4 py-2 border border-gray-300" />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input {...register('lastName')} className="w-full px-4 py-2 border border-gray-300" />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-300" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-serif font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input {...register('address')} className="w-full px-4 py-2 border border-gray-300" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input {...register('city')} className="w-full px-4 py-2 border border-gray-300" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input {...register('zip')} className="w-full px-4 py-2 border border-gray-300" />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select {...register('country')} className="w-full px-4 py-2 border border-gray-300 bg-white">
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="PK">Pakistan</option>
                  </select>
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-serif font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                  <input {...register('paymentMethod')} type="radio" value="card" className="text-black focus:ring-black" />
                  <span className="ml-3 font-medium">Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                  <input {...register('paymentMethod')} type="radio" value="cod" className="text-black focus:ring-black" />
                  <span className="ml-3 font-medium">Cash on Delivery</span>
                </label>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-sm">
                  <p className="text-sm text-gray-500">
                    Payment processing is simulated for this demo. No actual charge will be made.
                  </p>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isProcessing}>
              Place Order — {formatCurrency(grandTotal)}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 h-fit sticky top-24">
          <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 bg-gray-200 overflow-hidden rounded-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                      {item.fabric && <span className="block">Fabric: {item.fabric}</span>}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
            </div>
            {shippingCost > 0 && (
              <p className="text-xs text-gray-500 italic">
                Free shipping on orders over {formatCurrency(5000)}
              </p>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
