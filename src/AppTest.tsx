import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageTest from './pages/HomePageTest';
import ProductsPageTest from './pages/ProductsPageTest';

function AppTest() {
  console.log('AppTest component rendering');
  
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePageTest />} />
          <Route path="/products" element={<ProductsPageTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppTest;
