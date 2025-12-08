import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMSSidebar from './components/common/CMSSidebar';
import ScrollToTop from './components/common/ScrollToTop';
import HomeCMS from './pages/HomeCMS';
import AboutCMS from './pages/AboutCMS';
import AnalFistulaCMS from './pages/AnalFistulaCMS';
import PilesCMS from './pages/PilesCMS';
import PelvicFloorCMS from './pages/PelvicFloorCMS';
import BandingPilesCMS from './pages/BandingPilesCMS';
import ColorectalSymptomsCMS from './pages/ColorectalSymptomsCMS';
import ColonRectalCancerCMS from './pages/ColonRectalCancerCMS';
import LaserSurgeryCMS from './pages/LaserSurgeryCMS';
import AnalWoundCareCMS from './pages/AnalWoundCareCMS';
import AnalFissureCMS from './pages/AnalFissureCMS';
import ProductCMS from './pages/ProductCMS';
import CommonCMS from './pages/CommonCMS';
import GutBrainAxisCMS from './pages/GutBrainAxisCMS';
import ColonHydrotherapyCMS from './pages/ColonHydrotherapyCMS';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 flex">
        <CMSSidebar onCollapseChange={setIsSidebarCollapsed} />
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <Routes>
            <Route path="/" element={<HomeCMS />} />
            <Route path="/home" element={<HomeCMS />} />
            <Route path="/about" element={<AboutCMS />} />
            <Route path="/anal-fistula" element={<AnalFistulaCMS />} />
            <Route path="/piles" element={<PilesCMS />} />
            <Route path="/pelvic-floor" element={<PelvicFloorCMS />} />
            <Route path="/banding-piles" element={<BandingPilesCMS />} />
            <Route path="/colorectal-symptoms" element={<ColorectalSymptomsCMS />} />
            <Route path="/colon-rectal-cancer" element={<ColonRectalCancerCMS />} />
            <Route path="/laser-surgery" element={<LaserSurgeryCMS />} />
            <Route path="/anal-wound-care" element={<AnalWoundCareCMS />} />
            <Route path="/anal-fissure" element={<AnalFissureCMS />} />
            <Route path="/product" element={<ProductCMS />} />
            <Route path="/common" element={<CommonCMS />} />
            <Route path="/gut-brain-axis" element={<GutBrainAxisCMS />} />
            <Route path="/colon-hydrotherapy" element={<ColonHydrotherapyCMS />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

