import React, { useState, useEffect, useRef } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import Primarybtn from "../button";
import AiNeuralNetworkSvg from "./diagrams/AiNeuralNetworkSvg";
import { fetchAiExplorerStepsData } from "../../data/aiContentData";
import "./AiExplorerSection.css";

const AUTO_ROTATE_INTERVAL_MS = 800;

function AiExplorerSection() {
  const [steps, setSteps] = useState([]);
  const [activeStepId, setActiveStepId] = useState("step-2");
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [imgErrorMap, setImgErrorMap] = useState({});

  const listContainerRef = useRef(null);
  const activeStepRef = useRef(null);

  // Load steps data
  useEffect(() => {
    let isMounted = true;
    const loadSteps = async () => {
      try {
        const data = await fetchAiExplorerStepsData();
        if (isMounted) {
          setSteps(data);
          if (data && data.length > 1) {
            setActiveStepId(data[1].id); // Step 2 Statistics & Probability
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load AI Explorer steps:", err);
        if (isMounted) setIsLoading(false);
      }
    };
    loadSteps();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-advance next step every 800ms (pauses on hover)
  useEffect(() => {
    if (isPaused || isLoading || steps.length === 0) return;

    const timer = setInterval(() => {
      setActiveStepId((currentId) => {
        const currentIndex = steps.findIndex((s) => s.id === currentId);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex].id;
      });
    }, AUTO_ROTATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, isLoading, steps]);

  // Smooth scroll active item ONLY inside the container div (never scrolling the main window)
  useEffect(() => {
    if (activeStepRef.current && listContainerRef.current) {
      const container = listContainerRef.current;
      const item = activeStepRef.current;

      const itemTop = item.offsetTop;
      const itemHeight = item.offsetHeight;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      if (itemTop < containerScrollTop) {
        container.scrollTo({ top: itemTop, behavior: "smooth" });
      } else if (itemTop + itemHeight > containerScrollTop + containerHeight) {
        container.scrollTo({ top: itemTop + itemHeight - containerHeight, behavior: "smooth" });
      }
    }
  }, [activeStepId]);

  if (isLoading || steps.length === 0) return null;

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];
  const hasValidImage = activeStep.image && activeStep.image.trim() !== "" && !imgErrorMap[activeStep.id];

  const handleImgError = (id) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="xlr-aiexplorer-section">
      <div className="xlr-aiexplorer-container">
        {/* Section Header */}
        <div className="xlr-aiexplorer-header">
          <h2 className="xlr-aiexplorer-title">
            AI Engineering <span>(Complete One)</span>
          </h2>
          <p className="xlr-aiexplorer-subtitle">
            Every module in the AI Engineering curriculum, mapped out step by step.
          </p>
        </div>

        {/* 2-Column Explorer Grid (Pause auto-play on mouse hover) */}
        <div
          className="xlr-aiexplorer-grid"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Interactive Steps List */}
          <div className="xlr-aiexplorer-steps-list" ref={listContainerRef}>
            {steps.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <div
                  key={step.id}
                  ref={isActive ? activeStepRef : null}
                  className={`xlr-aiexplorer-step-item ${isActive ? "xlr-aiexplorer-step-item--active" : ""}`}
                  onClick={() => {
                    setActiveStepId(step.id);
                    setIsPaused(true);
                  }}
                >
                  <div className="xlr-step-item-text">
                    <span className="xlr-step-item-title">{step.title}</span>
                    <span className="xlr-step-item-subtitle">{step.subtitle}</span>
                  </div>
                  {isActive && <RiArrowRightSLine className="xlr-step-chevron" size={18} />}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Step Details Showcase */}
          <div className="xlr-aiexplorer-preview-panel">
            <div className="xlr-aiexplorer-image-container">
              {/* Ambient Glow Behind Image */}
              <div
                className="xlr-aiexplorer-image-glow"
                style={{ "--active-glow-color": activeStep.shadowGlowColor || "rgba(37, 99, 235, 0.55)" }}
              />

              <div className="xlr-aiexplorer-image-wrapper">
                {hasValidImage ? (
                  <img
                    src={activeStep.image}
                    alt={activeStep.detailTitle}
                    onError={() => handleImgError(activeStep.id)}
                    className="xlr-aiexplorer-preview-img"
                  />
                ) : (
                  <AiNeuralNetworkSvg />
                )}
              </div>
            </div>

            <div className="xlr-aiexplorer-detail-body">
              <h3 className="xlr-aiexplorer-detail-title">{activeStep.detailTitle}</h3>
              <p className="xlr-aiexplorer-detail-desc">{activeStep.description}</p>
              <div className="xlr-aiexplorer-detail-action">
                <Primarybtn className="xlr-navbtn" text="Explore" icon={<RiArrowRightSLine size={19} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiExplorerSection;
