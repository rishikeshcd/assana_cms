import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMSNavbar from './components/common/CMSNavbar';
import HomeCMS from './pages/HomeCMS';
import AboutCMS from './pages/AboutCMS';
import AnalFistulaCMS from './pages/AnalFistulaCMS';
import PelvicFloorCMS from './pages/PelvicFloorCMS';
import BandingPilesCMS from './pages/BandingPilesCMS';
import ColorectalSymptomsCMS from './pages/ColorectalSymptomsCMS';
import ColonRectalCancerCMS from './pages/ColonRectalCancerCMS';
import LaserSurgeryCMS from './pages/LaserSurgeryCMS';
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
          <Route path="/banding-piles" element={<BandingPilesCMS />} />
          <Route path="/colorectal-symptoms" element={<ColorectalSymptomsCMS />} />
          <Route path="/colon-rectal-cancer" element={<ColonRectalCancerCMS />} />
          <Route path="/laser-surgery" element={<LaserSurgeryCMS />} />
          <Route path="/product" element={<ProductCMS />} />
          <Route path="/common" element={<CommonCMS />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

