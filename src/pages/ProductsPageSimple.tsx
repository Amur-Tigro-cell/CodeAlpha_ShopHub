import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ProductsPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log('ProductsPageSimple component rendering');

  // Static mock product data - using user's real product URLs
  const mockProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
      price: 129.99,
      rating: 4.5,
      numReviews: 32,
      category: 'electronics',
      images: ['https://m.media-amazon.com/images/I/51ZR4lyxBHL.jpg']
    },
    {
      _id: '2',
      name: 'Smart Watch Pro',
      description: 'Advanced fitness tracking smartwatch with heart rate monitor',
      price: 89.99,
      rating: 4.2,
      numReviews: 18,
      category: 'electronics',
      images: ['https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg']
    },
    {
      _id: '3',
      name: 'Laptop Stand Adjustable',
      description: 'Ergonomic aluminum laptop stand with adjustable height',
      price: 49.99,
      rating: 4.7,
      numReviews: 45,
      category: 'electronics',
      images: ['https://m.media-amazon.com/images/I/81wKjJK1bdL.jpg']
    },
    {
      _id: '4',
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices',
      price: 29.99,
      rating: 4.3,
      numReviews: 28,
      category: 'electronics',
      images: ['https://m.media-amazon.com/images/I/51Tue8wWv-L.jpg']
    },
    {
      _id: '5',
      name: 'Classic Novel Collection',
      description: 'Best-selling fiction books including mystery, romance, and adventure novels',
      price: 19.99,
      rating: 4.8,
      numReviews: 156,
      category: 'books',
      images: ['https://i.thriftbooks.com/api/imagehandler/m/D09FB309EF898DA73A6B1FA1ACC8C91718419CFC.jpeg']
    },
    {
      _id: '6',
      name: 'Programming Guide',
      description: 'Complete guide to modern web development and programming languages',
      price: 34.99,
      rating: 4.6,
      numReviews: 89,
      category: 'books',
      images: ['https://www.quickstartguides.com/cdn/shop/files/Programming_Bundle_SB_Cover.png?v=1752182180']
    },
    {
      _id: '7',
      name: 'Men\'s Casual T-Shirt',
      description: 'Comfortable cotton t-shirt perfect for everyday wear',
      price: 24.99,
      rating: 4.1,
      numReviews: 234,
      category: 'clothing',
      images: ['https://i5.walmartimages.com/seo/cfhntfmh-Henley-Shirts-for-Men-Basic-Summer-Tee-Shirts-Short-Sleeve-Slim-Fit-Henley-Muscle-Tshirts-Button-Tee-Shirts_0186d221-20f9-4504-ad54-147c4dbb8917.b17859c2063d9de21508c123f32cc771.jpeg']
    },
    {
      _id: '8',
      name: 'Women\'s Summer Dress',
      description: 'Elegant summer dress made from breathable fabric',
      price: 49.99,
      rating: 4.4,
      numReviews: 178,
      category: 'clothing',
      images: ['https://fehaute.com/image/catalog/product/2026-01/27/37db9edaf74d32bd9e893572ffb190ea.png']
    },
    {
      _id: '9',
      name: 'Garden Tool Set',
      description: 'Complete set of essential gardening tools for home use',
      price: 39.99,
      rating: 4.2,
      numReviews: 167,
      category: 'home',
      images: ['https://m.media-amazon.com/images/I/71RyBb5UXcL._AC_SL1500_.jpg']
    },
    {
      _id: '10',
      name: 'Kitchen Knife Set',
      description: 'Professional chef\'s knife set with wooden block',
      price: 79.99,
      rating: 4.7,
      numReviews: 145,
      category: 'home',
      images: ['https://m.media-amazon.com/images/I/81DhT1AO0GL._AC_SL1500_.jpg']
    },
    {
      _id: '11',
      name: 'Yoga Mat Premium',
      description: 'Non-slip exercise mat with carrying strap',
      price: 29.99,
      rating: 4.5,
      numReviews: 92,
      category: 'sports',
      images: ['https://api.everythingbranded.com/cdn-cgi/image/width=500,height=500,quality=75,fit=pad/media/image/60/6055/6055BLUBLL/6055_BLUBLL_Silkscreen.jpg']
    },
    {
      _id: '12',
      name: 'Running Shoes',
      description: 'Lightweight athletic shoes for running and training',
      price: 89.99,
      rating: 4.3,
      numReviews: 203,
      category: 'sports',
      images: ['https://believeintherun.com/wp-content/uploads/2023/06/asics-magic-speed-3-feature.jpg']
    }
  ];

  const categories = ['All', 'electronics', 'clothing', 'books', 'home', 'sports'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        image: product.images[0] // Save the first image
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIconSolid
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.log('Image failed to load:', product.images[0]);
                    // Try multiple fallback options
                    const fallbacks = [
                      `https://picsum.photos/400/300?random=${product._id}`,
                      `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(product.name)}`,
                      'https://picsum.photos/400/300'
                    ];
                    let fallbackIndex = 0;
                    
                    const tryNextFallback = () => {
                      if (fallbackIndex < fallbacks.length) {
                        e.currentTarget.src = fallbacks[fallbackIndex];
                        fallbackIndex++;
                      }
                    };
                    
                    tryNextFallback();
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', product.images[0]);
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.numReviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      console.log('ProductsPageSimple - Clicking product:', product._id);
                      navigate(`/product/${product._id}`);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPageSimple;
