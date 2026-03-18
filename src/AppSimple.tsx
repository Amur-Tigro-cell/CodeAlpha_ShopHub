import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test components
const SimpleHome: React.FC = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Simple Home Page</h1>
    <p className="mb-4">This is a test to see if basic routing works.</p>
    <a href="/products" className="bg-blue-500 text-white px-4 py-2 rounded">
      Go to Products
    </a>
  </div>
);

const SimpleProducts: React.FC = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Simple Products Page</h1>
    <p className="mb-4">Products page is working!</p>
    <a href="/" className="bg-gray-500 text-white px-4 py-2 rounded">
      Back to Home
    </a>
  </div>
);

function AppSimple() {
  console.log('AppSimple component rendering');
  
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/products" element={<SimpleProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppSimple;
