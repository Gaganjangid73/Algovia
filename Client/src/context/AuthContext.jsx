import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const AuthContext = createContext();

const AUTH_STORAGE_KEY = "algovia_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("cpp");
  const [redirectPath, setRedirectPath] = useState(null);

  const isAuthenticated = !!user;

  const login = useCallback((email) => {
    const userObj = {
      email,
      name: email.includes("gaganjangid") ? "Gagan Jangid" : email.split("@")[0],
      loggedInAt: new Date().toISOString()
    };
    setUser(userObj);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
    } catch (e) {
      console.error("Failed to save auth state", e);
    }
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear auth state", e);
    }
    setIsProfileModalOpen(false);
  }, []);

  const openAuthModal = useCallback((path = null) => {
    if (path) setRedirectPath(path);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setRedirectPath(null);
  }, []);

  const openProfileModal = useCallback(() => {
    setIsProfileModalOpen(true);
  }, []);

  const closeProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    isAuthModalOpen,
    isProfileModalOpen,
    preferredLanguage,
    redirectPath,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    openProfileModal,
    closeProfileModal,
    setPreferredLanguage
  }), [
    user,
    isAuthenticated,
    isAuthModalOpen,
    isProfileModalOpen,
    preferredLanguage,
    redirectPath,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    openProfileModal,
    closeProfileModal
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
