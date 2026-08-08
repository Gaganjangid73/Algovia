import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "./AdminLayout.css";

export default function AdminLayout({ children, pendingVerificationsCount = 2, onRefresh, onLogout }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar pendingVerificationsCount={pendingVerificationsCount} onLogout={onLogout} />

      <div className="admin-main-viewport">
        <AdminHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={onRefresh}
        />

        <main className="admin-page-container">
          {children}
        </main>
      </div>
    </div>
  );
}
