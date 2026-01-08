
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import HomePage from './components/HomePage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './components/NotFound';
import SectionRoutes from './components/SectionRoutes';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<SectionRoutes />} />
        <Route path="/process" element={<SectionRoutes />} />
        <Route path="/about" element={<SectionRoutes />} />
        <Route path="/contact" element={<SectionRoutes />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
