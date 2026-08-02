import React, { useState, useEffect } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import AiNeuralNetworkSvg from "./diagrams/AiNeuralNetworkSvg";
import { fetchAiStepPathData } from "../../data/aiContentData";
import "./AiStepPathSection.css";

function AiStepPathSection() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgError1, setImgError1] = useState(false);
  const [imgError2, setImgError2] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPathData = async () => {
      try {
        const result = await fetchAiStepPathData();
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load AI Step Path data:", err);
        if (isMounted) setIsLoading(false);
      }
    };
    loadPathData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !data) return null;

  const { step1, step2 } = data;

  const hasValidImage1 = step1.image && step1.image.trim() !== "" && !imgError1;
  const hasValidImage2 = step2.image && step2.image.trim() !== "" && !imgError2;

  return (
    <section className="xlr-aistep-section">
      <div className="xlr-aistep-grid">
        {/* Step 1 Column */}
        <div className="xlr-aistep-col">
          <div className="xlr-aistep-header">
            <span className="xlr-aistep-badge">{step1.stepHeader}</span>
            <p className="xlr-aistep-header-desc">{step1.stepSubheader}</p>
          </div>

          <a href={step1.url} className="xlr-aistep-card xlr-aistep-card--step1">
            <div className="xlr-aistep-card-preview">
              {hasValidImage1 ? (
                <img
                  src={step1.image}
                  alt={step1.title}
                  onError={() => setImgError1(true)}
                  className="xlr-aistep-img"
                />
              ) : (
                <div className="xlr-preview-mock-window">
                  <div className="xlr-mock-header-nav">
                    <span className="xlr-mock-logo">Algovia.io</span>
                    <span className="xlr-mock-navitem">System Design</span>
                    <span className="xlr-mock-navitem">Data Structures</span>
                  </div>
                  <div className="xlr-mock-hero-text">
                    Master Your <span style={{ color: "#2563eb", fontWeight: 800 }}>Software Engineering</span> Interviews
                  </div>
                  <div className="xlr-mock-tagline">ONESTOP PLATFORM FOR ENGINEERS</div>
                  <div className="xlr-mock-searchbar">Search topics & resources...</div>

                  <div className="xlr-mock-cards-row">
                    <div className="xlr-mock-card-box">
                      <span className="xlr-mock-box-title">System Design & Architecture</span>
                      <div className="xlr-mock-hld-lines">
                        <span className="xlr-hld-dot" />
                        <span className="xlr-hld-line" />
                        <span className="xlr-hld-dot" />
                      </div>
                    </div>
                    <div className="xlr-mock-card-box">
                      <span className="xlr-mock-box-title">DSA & Algorithms</span>
                      <div className="xlr-mock-lld-boxes">
                        <span className="xlr-lld-mini" />
                        <span className="xlr-lld-mini" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="xlr-aistep-card-body">
              <h3 className="xlr-aistep-card-title">{step1.title}</h3>
              <p className="xlr-aistep-card-desc">{step1.subtitle}</p>
            </div>
          </a>
        </div>

        {/* Connector Arrow */}
        <div className="xlr-aistep-arrow-container">
          <div className="xlr-aistep-arrow-circle">
            <RiArrowRightLine size={18} />
          </div>
        </div>

        {/* Step 2 Column */}
        <div className="xlr-aistep-col">
          <div className="xlr-aistep-header">
            <span className="xlr-aistep-badge">{step2.stepHeader}</span>
            <p className="xlr-aistep-header-desc">{step2.stepSubheader}</p>
          </div>

          <a href={step2.url} className="xlr-aistep-card xlr-aistep-card--step2">
            <div className="xlr-aistep-card-preview">
              {hasValidImage2 ? (
                <img
                  src={step2.image}
                  alt={step2.title}
                  onError={() => setImgError2(true)}
                  className="xlr-aistep-img"
                />
              ) : (
                <AiNeuralNetworkSvg />
              )}
            </div>

            <div className="xlr-aistep-card-body">
              <h3 className="xlr-aistep-card-title">{step2.title}</h3>
              <p className="xlr-aistep-card-desc">{step2.subtitle}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default AiStepPathSection;
