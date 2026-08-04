import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { authApi, USER_STORAGE_KEY, TOKEN_STORAGE_KEY } from "../services/authApi";
import { getUserPlanType, isTopicUnlocked } from "../utils/subscriptionUtils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
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
  const userPlan = useMemo(() => getUserPlanType(user), [user]);

  const checkTopicAccess = useCallback((topicIndex, category) => {
    return isTopicUnlocked(topicIndex, category, user);
  }, [user]);

  // Hydrate user profile on page load if JWT token exists
  useEffect(() => {
    async function checkAuthStatus() {
      const token = authApi.getToken();
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.user) {
            setUser(res.user);
            if (res.user.preferredLanguage) {
              setPreferredLanguage(res.user.preferredLanguage);
            }
          }
        } catch (e) {
          console.warn("[AuthContext] Expired or invalid token. Clearing auth session.");
          authApi.logout();
          setUser(null);
        }
      }
    }
    checkAuthStatus();
  }, []);

  const login = useCallback((userObj) => {
    setUser(userObj);
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
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
    userPlan,
    checkTopicAccess,
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
    userPlan,
    checkTopicAccess,
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
