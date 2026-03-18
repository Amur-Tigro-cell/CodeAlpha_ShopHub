import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsPageTest: React.FC = () => {
  const navigate = useNavigate();

  console.log('ProductsPageTest component rendering');

  const mockProducts = [
    { id: 1, name: 'Test Product 1', price: 29.99 },
    { id: 2, name: 'Test Product 2', price: 39.99 },
    { id: 3, name: 'Test Product 3', price: 49.99 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products Page - TEST VERSION</h1>
        <p className="text-gray-600">If you can see this, navigation is working!</p>
      </div>

      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-4 py-2 rounded mr-4"
        >
          Back to Home
        </button>
        <button
          onClick={() => alert('Products page button works!')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Test Button
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <button
              onClick={() => alert(`Clicked on ${product.name}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPageTest;
