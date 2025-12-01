import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMSNavbar from './components/common/CMSNavbar';
import HomeCMS from './pages/HomeCMS';
import AboutCMS from './pages/AboutCMS';
import AnalFistulaCMS from './pages/AnalFistulaCMS';
import PelvicFloorCMS from './pages/PelvicFloorCMS';
import PilesCMS from './pages/PilesCMS';
import ProductCMS from './pages/ProductCMS';
import CommonCMS from './pages/CommonCMS';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <CMSNavbar />
        <Routes>
          <Route path="/" element={<HomeCMS />} />
          <Route path="/home" element={<HomeCMS />} />
          <Route path="/about" element={<AboutCMS />} />
          <Route path="/anal-fistula" element={<AnalFistulaCMS />} />
          <Route path="/pelvic-floor" element={<PelvicFloorCMS />} />
          <Route path="/piles" element={<PilesCMS />} />
          <Route path="/product" element={<ProductCMS />} />
          <Route path="/common" element={<CommonCMS />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

