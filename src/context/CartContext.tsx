import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartState, Product } from '../types';
import api from '../utils/api';

interface CartContextType extends CartState {
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: string }
  | { type: 'CART_UPDATE_QTY'; payload: { productId: string; qty: number } }
  | { type: 'CART_CLEAR' }
  | { type: 'CART_REQUEST' }
  | { type: 'CART_SUCCESS'; payload: CartItem[] }
  | { type: 'CART_FAIL'; payload: string };

const initialState: CartState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
  loading: false,
  error: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const existingItem = state.cartItems.find(
        (item) => item.product._id === action.payload.product._id
      );
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product._id === action.payload.product._id
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          ),
        };
      }
      
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product._id !== action.payload),
      };
    case 'CART_UPDATE_QTY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product._id === action.payload.productId
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    case 'CART_CLEAR':
      return { ...state, cartItems: [] };
    case 'CART_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CART_SUCCESS':
      return { ...state, loading: false, cartItems: action.payload, error: null };
    case 'CART_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product: Product, qty: number) => {
    const cartItem: CartItem = {
      product,
      name: product.name,
      image: product.images[0],
      price: product.price,
      qty,
    };
    dispatch({ type: 'CART_ADD_ITEM', payload: cartItem });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: productId });
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'CART_UPDATE_QTY', payload: { productId, qty } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CART_CLEAR' });
  };

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
