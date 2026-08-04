import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sdepage from './pages/Sdepage';
import AiPage from './pages/AiPage';
import DevopsPage from './pages/DevopsPage';
import HldPage from './pages/HldPage';
import LldPage from './pages/LldPage';
import LldProblemsPage from './pages/LldProblemsPage';
import SystemDesignPatternsPage from './pages/SystemDesignPatternsPage';
import SystemDesignScenariosPage from './pages/SystemDesignScenariosPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthModal from './components/auth/AuthModal';
import UserProfileModal from './components/auth/UserProfileModal';
import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import CancellationPolicyPage from './pages/CancellationPolicyPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sdepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
        <Route path="/payment/checkout" element={<CheckoutPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/hld" element={<ProtectedRoute><HldPage /></ProtectedRoute>} />
        <Route path="/hld/:topicId" element={<ProtectedRoute><HldPage /></ProtectedRoute>} />
        <Route path="/lld" element={<ProtectedRoute><LldPage /></ProtectedRoute>} />
        <Route path="/lld/:topicId" element={<ProtectedRoute><LldPage /></ProtectedRoute>} />
        <Route path="/lld-designs" element={<ProtectedRoute><LldProblemsPage /></ProtectedRoute>} />
        <Route path="/lld-designs/:topicId" element={<ProtectedRoute><LldProblemsPage /></ProtectedRoute>} />
        <Route path="/lld-problems" element={<Navigate to="/lld-designs" replace />} />
        <Route path="/lld-problems/:topicId" element={<ProtectedRoute><LldProblemsPage /></ProtectedRoute>} />
        <Route path="/system-design/interview-pattern" element={<ProtectedRoute><SystemDesignPatternsPage /></ProtectedRoute>} />
        <Route path="/system-design/interview-pattern/:patternId" element={<ProtectedRoute><SystemDesignPatternsPage /></ProtectedRoute>} />
        <Route path="/system-design/scenarios" element={<ProtectedRoute><SystemDesignScenariosPage /></ProtectedRoute>} />
        <Route path="/system-design/scenarios/:scenarioId" element={<ProtectedRoute><SystemDesignScenariosPage /></ProtectedRoute>} />
        <Route path="/system-design-scenario" element={<ProtectedRoute><SystemDesignScenariosPage /></ProtectedRoute>} />
        <Route path="/system-design-scenario/:scenarioId" element={<ProtectedRoute><SystemDesignScenariosPage /></ProtectedRoute>} />
        <Route path="/ai/engineering/home" element={<AiPage />} />
        <Route path="/devops/engineering/home" element={<DevopsPage />} />
        {/* Friendly fallback redirects */}
        <Route path="/ai/*" element={<Navigate to="/ai/engineering/home" replace />} />
        <Route path="/devops/*" element={<Navigate to="/devops/engineering/home" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Auth Modal & User Profile Modal */}
      <AuthModal />
      <UserProfileModal />
    </>
  );
}

export default App;
