import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ProductDetailPageSimple: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  console.log('ProductDetailPageSimple - id:', id);

  // Static mock product data - exactly matches ProductsPageSimple products with only real URLs
  const mockProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality. Features include active noise cancellation, comfortable over-ear design, and premium audio drivers.',
      price: 129.99,
      rating: 4.5,
      numReviews: 32,
      category: 'electronics',
      brand: 'AudioTech',
      countInStock: 15,
      images: [
        'https://m.media-amazon.com/images/I/51ZR4lyxBHL.jpg'
      ]
    },
    {
      _id: '2',
      name: 'Smart Watch Pro',
      description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS. Features include step counting, sleep tracking, and smartphone notifications.',
      price: 89.99,
      rating: 4.2,
      numReviews: 18,
      category: 'electronics',
      brand: 'TechWatch',
      countInStock: 20,
      images: [
        'https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg'
      ]
    },
    {
      _id: '3',
      name: 'Laptop Stand Adjustable',
      description: 'Ergonomic aluminum laptop stand with adjustable height and angle. Perfect for improving posture and reducing neck strain.',
      price: 49.99,
      rating: 4.7,
      numReviews: 45,
      category: 'electronics',
      brand: 'ErgoTech',
      countInStock: 30,
      images: [
        'https://m.media-amazon.com/images/I/81wKjJK1bdL.jpg'
      ]
    },
    {
      _id: '4',
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices. LED indicator shows charging status.',
      price: 29.99,
      rating: 4.3,
      numReviews: 28,
      category: 'electronics',
      brand: 'ChargeTech',
      countInStock: 40,
      images: [
        'https://m.media-amazon.com/images/I/51Tue8wWv-L.jpg'
      ]
    },
    {
      _id: '5',
      name: 'Classic Novel Collection',
      description: 'Best-selling fiction books including mystery, romance, and adventure novels. Perfect for book lovers and casual readers alike.',
      price: 19.99,
      rating: 4.8,
      numReviews: 156,
      category: 'books',
      brand: 'BookWorld',
      countInStock: 25,
      images: [
        'https://i.thriftbooks.com/api/imagehandler/m/D09FB309EF898DA73A6B1FA1ACC8C91718419CFC.jpeg'
      ]
    },
    {
      _id: '6',
      name: 'Programming Guide',
      description: 'Complete guide to modern web development and programming languages. Includes JavaScript, React, Node.js and more.',
      price: 34.99,
      rating: 4.6,
      numReviews: 89,
      category: 'books',
      brand: 'TechBooks',
      countInStock: 20,
      images: [
        'https://www.quickstartguides.com/cdn/shop/files/Programming_Bundle_SB_Cover.png?v=1752182180'
      ]
    },
    {
      _id: '7',
      name: 'Men\'s Casual T-Shirt',
      description: 'Comfortable cotton t-shirt perfect for everyday wear. Soft fabric and modern fit for all-day comfort.',
      price: 24.99,
      rating: 4.1,
      numReviews: 234,
      category: 'clothing',
      brand: 'ComfortWear',
      countInStock: 50,
      images: [
        'https://i5.walmartimages.com/seo/cfhntfmh-Henley-Shirts-for-Men-Basic-Summer-Tee-Shirts-Short-Sleeve-Slim-Fit-Henley-Muscle-Tshirts-Button-Tee-Shirts_0186d221-20f9-4504-ad54-147c4dbb8917.b17859c2063d9de21508c123f32cc771.jpeg'
      ]
    },
    {
      _id: '8',
      name: 'Women\'s Summer Dress',
      description: 'Elegant summer dress made from breathable fabric. Perfect for casual outings and special occasions.',
      price: 49.99,
      rating: 4.4,
      numReviews: 178,
      category: 'clothing',
      brand: 'FashionHub',
      countInStock: 35,
      images: [
        'https://fehaute.com/image/catalog/product/2026-01/27/37db9edaf74d32bd9e893572ffb190ea.png'
      ]
    },
    {
      _id: '9',
      name: 'Garden Tool Set',
      description: 'Complete set of essential gardening tools for home use. Includes everything you need for a beautiful garden.',
      price: 39.99,
      rating: 4.2,
      numReviews: 167,
      category: 'home',
      brand: 'GardenPro',
      countInStock: 30,
      images: [
        'https://m.media-amazon.com/images/I/71RyBb5UXcL._AC_SL1500_.jpg'
      ]
    },
    {
      _id: '10',
      name: 'Kitchen Knife Set',
      description: 'Professional chef\'s knife set with wooden block. Includes essential knives for all kitchen tasks.',
      price: 79.99,
      rating: 4.7,
      numReviews: 145,
      category: 'home',
      brand: 'ChefPro',
      countInStock: 15,
      images: [
        'https://m.media-amazon.com/images/I/81DhT1AO0GL._AC_SL1500_.jpg'
      ]
    },
    {
      _id: '11',
      name: 'Yoga Mat Premium',
      description: 'Non-slip exercise mat with carrying strap. Extra thick for comfort and joint protection.',
      price: 29.99,
      rating: 4.5,
      numReviews: 92,
      category: 'sports',
      brand: 'FitGear',
      countInStock: 40,
      images: [
        'https://api.everythingbranded.com/cdn-cgi/image/width=500,height=500,quality=75,fit=pad/media/image/60/6055/6055BLUBLL/6055_BLUBLL_Silkscreen.jpg'
      ]
    },
    {
      _id: '12',
      name: 'Running Shoes',
      description: 'Lightweight athletic shoes for running and training. Advanced cushioning and breathable mesh upper.',
      price: 89.99,
      rating: 4.3,
      numReviews: 203,
      category: 'sports',
      brand: 'SpeedRun',
      countInStock: 25,
      images: [
        'https://believeintherun.com/wp-content/uploads/2023/06/asics-magic-speed-3-feature.jpg'
      ]
    }
  ];

  const product = mockProducts.find(p => p._id === id);

  console.log('ProductDetailPageSimple - Looking for product with id:', id);
  console.log('ProductDetailPageSimple - Available products:', mockProducts.map(p => ({ id: p._id, name: p.name })));
  console.log('ProductDetailPageSimple - Found product:', product);

  const handleAddToCart = () => {
    if (product) {
      // Simple cart functionality
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          ...product,
          quantity,
          image: product.images[0] // Save the first image
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${quantity} ${product.name}(s) added to cart!`);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                console.log('Main image failed to load:', product.images[0]);
                // Try multiple fallback options
                const fallbacks = [
                  `https://picsum.photos/600/400?random=${product._id}`,
                  `https://via.placeholder.com/600x400/cccccc/666666?text=${encodeURIComponent(product.name)}`,
                  'https://picsum.photos/600/400'
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
                console.log('Main image loaded successfully:', product.images[0]);
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIconSolid
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-sm text-gray-500">Brand: {product.brand}</span>
            <br />
            <span className="text-sm text-gray-500">Category: {product.category}</span>
            <br />
            <span className="text-sm text-gray-500">
              In Stock: {product.countInStock} available
            </span>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-4">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded px-3 py-2"
              >
                {[...Array(Math.min(product.countInStock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageSimple;
