import { useState, useEffect } from "react";
import { fetchFaqData } from "../data/sdeContentData";

/**
 * Custom hook for FAQ section state and accordion expand/collapse logic
 */
export const useFaqData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active category tab state (default: 'plans')
  const [activeCategory, setActiveCategory] = useState("plans");

  // Open accordion item ID state (allows toggle open/close)
  const [openItemId, setOpenItemId] = useState("p1");

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFaqData();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("Failed to load FAQ section data:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Category switch handler
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    // Automatically open first item of selected category
    if (data && data.items && data.items[categoryId] && data.items[categoryId].length > 0) {
      setOpenItemId(data.items[categoryId][0].id);
    } else {
      setOpenItemId(null);
    }
  };

  // Accordion toggle handler
  const toggleAccordion = (itemId) => {
    setOpenItemId((prev) => (prev === itemId ? null : itemId));
  };

  return {
    data,
    loading,
    error,
    activeCategory,
    openItemId,
    handleCategorySelect,
    toggleAccordion
  };
};
