import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import StudentVerificationsPage from "./pages/StudentVerificationsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ContentManagementPage from "./pages/ContentManagementPage";
import SystemSettingsPage from "./pages/SystemSettingsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { adminApi } from "./services/adminApi";
import "./index.css";

function ProtectedAdminRoute({ children }) {
  if (!adminApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(adminApi.isAuthenticated());

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            <AdminLoginPage
              onLoginSuccess={() => setIsAuthenticated(true)}
            />
          }
        />

        {/* Protected Admin Command Center Routes */}
        <Route
          path="/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout onLogout={() => setIsAuthenticated(false)}>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/students" element={<StudentVerificationsPage />} />
                  <Route path="/payments" element={<PaymentsPage />} />
                  <Route path="/content" element={<ContentManagementPage />} />
                  <Route path="/settings" element={<SystemSettingsPage />} />
                </Routes>
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
