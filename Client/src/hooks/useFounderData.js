import { useState, useEffect } from "react";
import { fetchFounderData } from "../data/sdeContentData";

/**
 * Custom hook for Founder / 'Building Engineer, Not Just Coders' section
 * Manages async data fetching and state
 */
export const useFounderData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFounderData();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("Failed to load Founder section data:", err);
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
