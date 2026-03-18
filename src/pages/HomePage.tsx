import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon, ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getProductImages } from '../utils/productImages';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  console.log('HomePage component rendering');

  // Static mock data for now - using user's real product URLs
  const featuredProducts = [
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
      name: 'Classic Novel Collection',
      description: 'Best-selling fiction books including mystery, romance, and adventure novels',
      price: 19.99,
      rating: 4.8,
      numReviews: 156,
      category: 'books',
      images: ['https://i.thriftbooks.com/api/imagehandler/m/D09FB309EF898DA73A6B1FA1ACC8C91718419CFC.jpeg']
    },
    {
      _id: '3',
      name: 'Men\'s Casual T-Shirt',
      description: 'Comfortable cotton t-shirt perfect for everyday wear',
      price: 24.99,
      rating: 4.1,
      numReviews: 234,
      category: 'clothing',
      images: ['https://i5.walmartimages.com/seo/cfhntfmh-Henley-Shirts-for-Men-Basic-Summer-Tee-Shirts-Short-Sleeve-Slim-Fit-Henley-Muscle-Tshirts-Button-Tee-Shirts_0186d221-20f9-4504-ad54-147c4dbb8917.b17859c2063d9de21508c123f32cc771.jpeg']
    },
    {
      _id: '4',
      name: 'Garden Tool Set',
      description: 'Complete set of essential gardening tools for home use',
      price: 39.99,
      rating: 4.2,
      numReviews: 167,
      category: 'home',
      images: ['https://m.media-amazon.com/images/I/71RyBb5UXcL._AC_SL1500_.jpg']
    }
  ];

  const loading = false; // Static loading state

  console.log('HomePage - featuredProducts:', featuredProducts);

  const categories = [
    { name: 'Electronics', image: 'https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', count: 156 },
    { name: 'Clothing', image: 'https://images.pexels.com/photos/2979337/pexels-photo-2979337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', count: 234 },
    { name: 'Books', image: 'https://images.pexels.com/photos/256780/pexels-photo-256780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', count: 89 },
    { name: 'Home & Garden', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', count: 167 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Discover amazing products at unbeatable prices
            </p>
            <button
              onClick={() => {
                console.log('Start Shopping button clicked, navigating to /products');
                navigate('/products');
              }}
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <div className="mt-4">
              <button
                onClick={() => {
                  console.log('Test button clicked, navigating to /products');
                  navigate('/products');
                }}
                className="bg-green-500 text-white px-4 py-2 rounded text-sm"
              >
                Test Navigation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBagIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of products across multiple categories</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIconSolid className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium products from trusted brands</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ArrowRightIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/products"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center"
            >
              View All
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={() => console.log('HomePage - Clicking product:', product._id)}
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
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.numReviews})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Subscribe to our newsletter for exclusive deals and new product updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
