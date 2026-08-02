import { useState, useEffect } from "react";
import { fetchReviewsData } from "../data/sdeContentData";

/**
 * Custom Hook for Reviews Section data fetching, state management, and modal control
 */
export const useReviewsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State initialized with default user values matching screenshot
  const [formState, setFormState] = useState({
    name: "Gagan Jangid",
    email: "gaganjangid02@gmail.com",
    review: ""
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await fetchReviewsData();
        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        console.error("Failed to load reviews data:", err);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formState.name}! Your review has been submitted.`);
    closeModal();
  };

  return {
    data,
    loading,
    isModalOpen,
    openModal,
    closeModal,
    formState,
    handleInputChange,
    handleFormSubmit
  };
};
