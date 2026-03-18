// Product Image Management System
// This file manages paths to real product images

export interface ProductImage {
  id: string;
  name: string;
  category: string;
  images: string[];
}

// Real product image paths
export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    category: 'electronics',
    images: [
      '/product-images/headphones.jpg',
      '/product-images/headphones-side.jpg',
      '/product-images/headphones-box.jpg'
    ]
  },
  {
    id: '2',
    name: 'Classic Novel Collection',
    category: 'books',
    images: [
      '/product-images/books.jpg',
      '/product-images/books-collection.jpg',
      '/product-images/books-stack.jpg'
    ]
  },
  {
    id: '3',
    name: 'Men\'s Casual T-Shirt',
    category: 'clothing',
    images: [
      '/product-images/tshirt.jpg',
      '/product-images/tshirt-front.jpg',
      '/product-images/tshirt-back.jpg'
    ]
  },
  {
    id: '4',
    name: 'Garden Tool Set',
    category: 'home',
    images: [
      '/product-images/garden-tools.jpg',
      '/product-images/tools-set.jpg',
      '/product-images/gardening-kit.jpg'
    ]
  },
  {
    id: '5',
    name: 'Smart Watch Pro',
    category: 'electronics',
    images: [
      '/product-images/smartwatch.jpg',
      '/product-images/watch-face.jpg',
      '/product-images/watch-band.jpg'
    ]
  },
  {
    id: '6',
    name: 'Programming Guide',
    category: 'books',
    images: [
      '/product-images/programming-book.jpg',
      '/product-images/coding-book.jpg',
      '/product-images/tech-book.jpg'
    ]
  }
];

// Function to get product images by ID
export const getProductImages = (productId: string): string[] => {
  const product = PRODUCT_IMAGES.find(p => p.id === productId);
  return product ? product.images : ['/product-images/placeholder.jpg'];
};

// Function to get fallback placeholder images by category
export const getPlaceholderImage = (category: string): string => {
  const placeholders: { [key: string]: string } = {
    electronics: '/product-images/electronics-placeholder.jpg',
    books: '/product-images/books-placeholder.jpg',
    clothing: '/product-images/clothing-placeholder.jpg',
    home: '/product-images/home-placeholder.jpg',
    sports: '/product-images/sports-placeholder.jpg'
  };
  return placeholders[category] || '/product-images/placeholder.jpg';
};

// Function to validate if image exists
export const validateImageExists = (imagePath: string): boolean => {
  // In a real app, you would check if the file exists
  // For now, we'll assume placeholder images exist
  return imagePath.includes('placeholder') || imagePath.includes('product-images');
};
