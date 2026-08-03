import React, { useState, useEffect, useRef } from "react";
import PrimaryBtn from "../button";
import { fetchFeatureShowcaseData } from "../../data/sdeContentData";

const ROTATION_INTERVAL_MS = 2000;
const TRANSITION_DURATION_MS = 450;

/**
 * Interactive Feature Showcase section with smooth Enter-from-Right, Exit-to-Left carousel transition
 */
const FeatureShowcaseSection = ({ 
  fetchDataFn = fetchFeatureShowcaseData,
  sectionTitle = "Everything you need, in one place" 
}) => {
  const [items, setItems] = useState([]);
  const [activeTabId, setActiveTabId] = useState("");
  const [exitingItem, setExitingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const activeTabIdRef = useRef(activeTabId);
  const itemsRef = useRef(items);

  activeTabIdRef.current = activeTabId;
  itemsRef.current = items;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDataFn();
        setItems(data);
        if (data && data.length > 0) {
          setActiveTabId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load feature showcase data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchDataFn]);

  // Function to switch tab with smooth exit-left & enter-right animation
  const switchTab = (newId) => {
    if (newId === activeTabIdRef.current) return;

    const currentItem = itemsRef.current.find((i) => i.id === activeTabIdRef.current);
    setExitingItem(currentItem);
    setActiveTabId(newId);

    setTimeout(() => {
      setExitingItem(null);
    }, TRANSITION_DURATION_MS);
  };

  // Auto-play timer effect (2 Seconds)
  useEffect(() => {
    if (isPaused || loading || items.length === 0) return;

    const timer = setInterval(() => {
      const currentId = activeTabIdRef.current;
      const currentIndex = itemsRef.current.findIndex((item) => item.id === currentId);
      const nextIndex = (currentIndex + 1) % itemsRef.current.length;
      switchTab(itemsRef.current[nextIndex].id);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, loading, items]);

  if (loading || items.length === 0) {
    return null;
  }

  const activeItem = items.find((item) => item.id === activeTabId) || items[0];

  return (
    <section 
      className="sde-showcase-section" 
      aria-labelledby="showcase-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="sde-showcase-header">
        <h2 id="showcase-heading">
          Everything you need, <span>in one place</span>
        </h2>
        <p className="sde-showcase-subtitle">
          Everything an engineer needs to crack interviews, instead of ten open tabs.
        </p>
      </div>

      <div className="sde-showcase-body">
        {/* Left Column: Vertical Navigation List */}
        <div className="sde-showcase-tabs">
          {items.map((item) => {
            const isActive = item.id === activeTabId;
            return (
              <button
                key={item.id}
                type="button"
                className={`sde-tab-item ${isActive ? "sde-tab-item--active" : ""}`}
                onClick={() => {
                  switchTab(item.id);
                  setIsPaused(true);
                }}
              >
                <div className="sde-tab-content-wrapper">
                  <div className="sde-tab-text">
                    <h4 className="sde-tab-title">{item.title}</h4>
                    <p className="sde-tab-subtitle">{item.subtitle}</p>
                  </div>
                  {isActive && (
                    <span className="sde-tab-arrow" aria-hidden="true">
                      ›
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Stacked Cards & Details with Smooth Carousel Animation */}
        <div className="sde-showcase-preview-container">
          {/* Exiting Item (Slides Out to Left) */}
          {exitingItem && (
            <div key={`exit-${exitingItem.id}`} className="sde-showcase-preview sde-exit-left">
              <div 
                className="sde-stack-wrapper"
                style={{ "--shadow-glow-color": exitingItem.shadowGlow || "var(--color-blue-glow)" }}
              >
                {exitingItem.images.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    className={`sde-stack-card sde-stack-card--${index}`}
                    style={{ zIndex: exitingItem.images.length - index }}
                  >
                    <img src={imgUrl} alt={`${exitingItem.title} preview ${index + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="sde-showcase-details">
                <h3 className="sde-details-title">{exitingItem.detailTitle}</h3>
                <p className="sde-details-desc">{exitingItem.detailDescription}</p>

                <PrimaryBtn 
                  text="Explore" 
                  icon={<span className="sde-btn-arrow">→</span>} 
                  className="sde-global-primary-btn"
                  onClick={() => alert(`Navigating to ${exitingItem.detailTitle}`)}
                />
              </div>
            </div>
          )}

          {/* Active Entering Item (Slides In from Right) */}
          <div key={`active-${activeItem.id}`} className="sde-showcase-preview sde-enter-right">
            <div 
              className="sde-stack-wrapper"
              style={{ "--shadow-glow-color": activeItem.shadowGlow || "var(--color-blue-glow)" }}
            >
              {activeItem.images.map((imgUrl, index) => (
                <div 
                  key={index} 
                  className={`sde-stack-card sde-stack-card--${index}`}
                  style={{ zIndex: activeItem.images.length - index }}
                >
                  <img src={imgUrl} alt={`${activeItem.title} preview ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="sde-showcase-details">
              <h3 className="sde-details-title">{activeItem.detailTitle}</h3>
              <p className="sde-details-desc">{activeItem.detailDescription}</p>

              <PrimaryBtn 
                text="Explore" 
                icon={<span className="sde-btn-arrow">→</span>} 
                className="sde-global-primary-btn"
                onClick={() => alert(`Navigating to ${activeItem.detailTitle}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcaseSection;
