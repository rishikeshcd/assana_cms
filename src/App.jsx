import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMSNavbar from './components/CMSNavbar';
import HomeCMS from './pages/HomeCMS';
import AboutCMS from './pages/AboutCMS';
import AnalFistulaCMS from './pages/AnalFistulaCMS';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

