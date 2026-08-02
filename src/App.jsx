import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sdepage from './pages/Sdepage';
import AiPage from './pages/AiPage';
import DevopsPage from './pages/DevopsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sdepage />} />
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
