import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { openAuthModal, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    } else {
      openAuthModal("/");
    }
  }, [isAuthenticated]);

  return <div style={{ minHeight: "100vh", backgroundColor: "#090c15" }} />;
}
