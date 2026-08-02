import { useState, useEffect } from "react";
import { 
  fetchSystemDesignDropdownData, 
  fetchDsaDropdownData,
  fetchSoftwareEngineerBucketData 
} from "../data/sdeContentData";
import { fetchAiEngineeringDropdownData } from "../data/aiContentData";
import { fetchDevopsEngineeringDropdownData } from "../data/devopsContentData";

/**
 * Custom Hook for fetching Navbar Mega Menu & Dropdown data (Backend Decoupled standard)
 */
export const useNavDropdownData = () => {
  const [systemDesignData, setSystemDesignData] = useState([]);
  const [dsaData, setDsaData] = useState(null);
  const [sweBucketData, setSweBucketData] = useState([]);
  const [aiEngineeringData, setAiEngineeringData] = useState([]);
  const [devopsEngineeringData, setDevopsEngineeringData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [sdResult, dsaResult, sweResult, aiResult, devopsResult] = await Promise.all([
          fetchSystemDesignDropdownData(),
          fetchDsaDropdownData(),
          fetchSoftwareEngineerBucketData(),
          fetchAiEngineeringDropdownData(),
          fetchDevopsEngineeringDropdownData()
        ]);
        if (isMounted) {
          setSystemDesignData(sdResult);
          setDsaData(dsaResult);
          setSweBucketData(sweResult);
          setAiEngineeringData(aiResult);
          setDevopsEngineeringData(devopsResult);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch Navbar dropdown data:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { 
    systemDesignData, 
    dsaData, 
    sweBucketData, 
    aiEngineeringData, 
    devopsEngineeringData, 
    isLoading 
  };
};
