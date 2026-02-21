import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
  fabric: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          (item) => 
            item.productId === newItem.productId && 
            item.size === newItem.size && 
            item.color === newItem.color &&
            item.fabric === newItem.fabric
        );

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
            isOpen: true,
          };
        }

        return {
          items: [...state.items, { ...newItem, id: Math.random().toString(36).substring(7) }],
          isOpen: true,
        };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'zavero-cart',
    }
  )
);
