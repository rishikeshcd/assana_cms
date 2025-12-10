import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMSSidebar from './components/common/CMSSidebar';
import ScrollToTop from './components/common/ScrollToTop';
import HomeCMS from './pages/HomeCMS';
import AboutCMS from './pages/AboutCMS';
import AnalFistulaCMS from './pages/colorectal_clinic/AnalFistulaCMS';
import PilesCMS from './pages/colorectal_clinic/PilesCMS';
import PelvicFloorCMS from './pages/colorectal_clinic/PelvicFloorCMS';
import BandingPilesCMS from './pages/colorectal_clinic/BandingPilesCMS';
import ColorectalSymptomsCMS from './pages/colorectal_clinic/ColorectalSymptomsCMS';
import ColonRectalCancerCMS from './pages/colorectal_clinic/ColonRectalCancerCMS';
import LaserSurgeryCMS from './pages/colorectal_clinic/LaserSurgeryCMS';
import AnalWoundCareCMS from './pages/colorectal_clinic/AnalWoundCareCMS';
import AnalFissureCMS from './pages/colorectal_clinic/AnalFissureCMS';
import ProductCMS from './pages/ProductCMS';
import CommonCMS from './pages/CommonCMS';
import GutBrainAxisCMS from './pages/gut_wellness/GutBrainAxisCMS';
import ColonHydrotherapyCMS from './pages/gut_wellness/ColonHydrotherapyCMS';
import AssanaButtCheckCMS from './pages/gut_wellness/AssanaButtCheckCMS';
import NewMomProgramCMS from './pages/gut_wellness/NewMomProgramCMS';
import MenopauseProgramCMS from './pages/gut_wellness/MenopauseProgramCMS';
import SeniorCitizensProgrammeCMS from './pages/gut_wellness/SeniorCitizensProgrammeCMS';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen  flex">
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
            <Route path="/assana-butt-check" element={<AssanaButtCheckCMS />} />
            <Route path="/new-mom-program" element={<NewMomProgramCMS />} />
            <Route path="/menopause-program" element={<MenopauseProgramCMS />} />
            <Route path="/senior-citizens-programme" element={<SeniorCitizensProgrammeCMS />} />
          </Routes>
        </main>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;

