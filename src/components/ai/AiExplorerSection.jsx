import React, { useState, useEffect } from "react";
import { RiChevronRightLine, RiArrowRightSLine } from "react-icons/ri";
import Primarybtn from "../button";
import AiNeuralNetworkSvg from "./diagrams/AiNeuralNetworkSvg";
import { fetchAiExplorerStepsData } from "../../data/aiContentData";
import "./AiExplorerSection.css";

function AiExplorerSection() {
  const [steps, setSteps] = useState([]);
  const [activeStepId, setActiveStepId] = useState("step-2"); // Default to Step 2 Statistics & Probability
  const [isLoading, setIsLoading] = useState(true);
  const [imgErrorMap, setImgErrorMap] = useState({});

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

        {/* 2-Column Explorer Grid */}
        <div className="xlr-aiexplorer-grid">
          {/* Left Column: Interactive Steps List */}
          <div className="xlr-aiexplorer-steps-list">
            {steps.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <div
                  key={step.id}
                  className={`xlr-aiexplorer-step-item ${isActive ? "xlr-aiexplorer-step-item--active" : ""}`}
                  onClick={() => setActiveStepId(step.id)}
                >
                  <div className="xlr-step-item-text">
                    <span className="xlr-step-item-title">{step.title}</span>
                    <span className="xlr-step-item-subtitle">{step.subtitle}</span>
                  </div>
                  {isActive && <RiChevronRightLine className="xlr-step-chevron" size={18} />}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Step Details Showcase */}
          <div className="xlr-aiexplorer-preview-panel">
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

            <div className="xlr-aiexplorer-detail-body">
              <h3 className="xlr-aiexplorer-detail-title">{activeStep.detailTitle}</h3>
              <p className="xlr-aiexplorer-detail-desc">{activeStep.description}</p>
              <div className="xlr-aiexplorer-detail-action">
                <Primarybtn text="Explore" icon={<RiArrowRightSLine size={19} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiExplorerSection;
