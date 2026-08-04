import { useState, useEffect } from "react";
import { fetchWhyUsData } from "../data/sdeContentData";

/**
 * Custom Hook to encapsulate data fetching and state management for Why Us section
 */
export const useWhyUsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const res = await fetchWhyUsData();
        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("Failed to load Why Us section data:", err);
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

  return { data, loading, error };
};
