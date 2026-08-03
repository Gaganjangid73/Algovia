import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sdepage from './pages/Sdepage';
import AiPage from './pages/AiPage';
import DevopsPage from './pages/DevopsPage';
import HldPage from './pages/HldPage';
import LldPage from './pages/LldPage';
import LldProblemsPage from './pages/LldProblemsPage';
import SystemDesignPatternsPage from './pages/SystemDesignPatternsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sdepage />} />
      <Route path="/hld" element={<HldPage />} />
      <Route path="/hld/:topicId" element={<HldPage />} />
      <Route path="/lld" element={<LldPage />} />
      <Route path="/lld/:topicId" element={<LldPage />} />
      <Route path="/lld-designs" element={<LldProblemsPage />} />
      <Route path="/lld-designs/:topicId" element={<LldProblemsPage />} />
      <Route path="/lld-problems" element={<Navigate to="/lld-designs" replace />} />
      <Route path="/lld-problems/:topicId" element={<LldProblemsPage />} />
      <Route path="/system-design/interview-pattern" element={<SystemDesignPatternsPage />} />
      <Route path="/system-design/interview-pattern/:patternId" element={<SystemDesignPatternsPage />} />
      <Route path="/ai/engineering/home" element={<AiPage />} />
      <Route path="/devops/engineering/home" element={<DevopsPage />} />
      {/* Friendly fallback redirects */}
      <Route path="/ai/*" element={<Navigate to="/ai/engineering/home" replace />} />
      <Route path="/devops/*" element={<Navigate to="/devops/engineering/home" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
