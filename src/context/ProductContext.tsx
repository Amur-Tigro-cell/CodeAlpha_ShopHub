import React, { createContext, useContext, useReducer } from 'react';
import { Product, ProductState } from '../types';

// Mock data for fallback
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 129.99,
    category: 'electronics',
    brand: 'AudioTech',
    images: ['https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 45,
    rating: 4.5,
    numReviews: 32,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 5-day battery life.',
    price: 89.99,
    category: 'electronics',
    brand: 'SmartTech',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 23,
    rating: 4.2,
    numReviews: 18,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle for perfect viewing position.',
    price: 49.99,
    category: 'electronics',
    brand: 'OfficePro',
    images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 67,
    rating: 4.7,
    numReviews: 45,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek and compact design.',
    price: 29.99,
    category: 'electronics',
    brand: 'PowerTech',
    images: ['https://images.pexels.com/photos/38568/led-micro-led-optical-fiber-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 89,
    rating: 4.3,
    numReviews: 28,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Premium Yoga Mat',
    description: 'Extra thick, non-slip yoga mat with alignment markers. Perfect for all types of yoga practice.',
    price: 39.99,
    category: 'sports',
    brand: 'FitGear',
    images: ['https://images.pexels.com/photos/6448010/pexels-photo-6448010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 34,
    rating: 4.6,
    numReviews: 21,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Running Shoes Pro',
    description: 'Lightweight and breathable running shoes with advanced cushioning technology for maximum comfort.',
    price: 79.99,
    category: 'sports',
    brand: 'SpeedRun',
    images: ['https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 56,
    rating: 4.4,
    numReviews: 38,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '7',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe and multiple brewing options for the perfect cup.',
    price: 69.99,
    category: 'home',
    brand: 'BrewMaster',
    images: ['https://images.pexels.com/photos/1028715/pexels-photo-1028715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 28,
    rating: 4.5,
    numReviews: 33,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '8',
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 modern ceramic plant pots with drainage trays. Perfect for indoor plants.',
    price: 34.99,
    category: 'home',
    brand: 'GreenHome',
    images: ['https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    stock: 41,
    rating: 4.8,
    numReviews: 19,
    reviews: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

interface ProductContextType extends ProductState {
  fetchProducts: (keyword?: string, category?: string, page?: number) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  clearProduct: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductAction =
  | { type: 'PRODUCT_LIST_REQUEST' }
  | { type: 'PRODUCT_LIST_SUCCESS'; payload: { products: Product[]; page: number; pages: number } }
  | { type: 'PRODUCT_LIST_FAIL'; payload: string }
  | { type: 'PRODUCT_DETAILS_REQUEST' }
  | { type: 'PRODUCT_DETAILS_SUCCESS'; payload: Product }
  | { type: 'PRODUCT_DETAILS_FAIL'; payload: string }
  | { type: 'PRODUCT_CLEAR' };

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { ...state, loading: true, error: null };
    case 'PRODUCT_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        error: null,
      };
    case 'PRODUCT_LIST_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PRODUCT_DETAILS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { ...state, loading: false, product: action.payload, error: null };
    case 'PRODUCT_DETAILS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PRODUCT_CLEAR':
      return { ...state, product: null };
    default:
      return state;
  }
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async (keyword?: string, category?: string, page?: number) => {
    try {
      dispatch({ type: 'PRODUCT_LIST_REQUEST' });
      
      // Use mock data directly for now
      console.log('Using mock data for products');
      
      let filteredProducts = mockProducts;
      
      // Apply filters to mock data
      if (keyword) {
        filteredProducts = mockProducts.filter(product =>
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      
      if (category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category === category
        );
      }
      
      const pageSize = 10;
      const currentPage = page || 1;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      // Simulate API delay for better UX
      setTimeout(() => {
        dispatch({ 
          type: 'PRODUCT_LIST_SUCCESS', 
          payload: {
            products: paginatedProducts,
            page: currentPage,
            pages: Math.ceil(filteredProducts.length / pageSize)
          }
        });
      }, 500);
      
    } catch (error: any) {
      dispatch({
        type: 'PRODUCT_LIST_FAIL',
        payload: error.response?.data?.message || 'Failed to fetch products',
      });
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
      
      // Use mock data directly
      console.log('Using mock data for product details');
      
      const mockProduct = mockProducts.find(p => p._id === id);
      
      // Simulate API delay
      setTimeout(() => {
        if (mockProduct) {
          dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: mockProduct });
        } else {
          dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload: 'Product not found',
          });
        }
      }, 300);
      
    } catch (error: any) {
      dispatch({
        type: 'PRODUCT_DETAILS_FAIL',
        payload: error.response?.data?.message || 'Failed to fetch product',
      });
    }
  };

  const clearProduct = () => {
    dispatch({ type: 'PRODUCT_CLEAR' });
  };

  const value: ProductContextType = {
    ...state,
    fetchProducts,
    fetchProduct,
    clearProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
