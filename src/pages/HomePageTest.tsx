import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const HomePageTest: React.FC = () => {
  const navigate = useNavigate();

  console.log('HomePageTest component rendering');

  const handleStartShopping = () => {
    console.log('Start Shopping button clicked, navigating to /products');
    navigate('/products');
  };

  const handleTestNavigation = () => {
    console.log('Test button clicked, navigating to /products');
    navigate('/products');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to ShopHub - TEST VERSION
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Discover amazing products at unbeatable prices
            </p>
            <button
              onClick={handleStartShopping}
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <div className="mt-4">
              <button
                onClick={handleTestNavigation}
                className="bg-green-500 text-white px-4 py-2 rounded text-sm"
              >
                Test Navigation
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => alert('Button click works!')}
                className="bg-red-500 text-white px-4 py-2 rounded text-sm"
              >
                Test Alert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Test Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Test Section</h2>
          <div className="text-center">
            <p className="text-gray-600">If you can see this, the page is loading correctly.</p>
            <div className="mt-4">
              <button
                onClick={() => console.log('Test button clicked!')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Console Test
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageTest;
