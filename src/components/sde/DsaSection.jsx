import React from "react";
import SdeCard from "./SdeCard";
import SlidingWindowVisual from "./SlidingWindowVisual";
import { DSA_DATA } from "../../data/sdeContentData";

const DsaSection = () => {
  const topCard = DSA_DATA[0];
  const gridCards = DSA_DATA.slice(1);

  return (
    <section className="Xlr-sderole-systemdesign-content" aria-labelledby="dsa-heading">
      <h2 id="dsa-heading">Data Structures & Algorithms (Systematic Way)</h2>

      <div className="sde-dsa-container">
        {/* Top Full-Width Card */}
        <div className="Xlr-sderole-systemdesign-content-card sde-card--full-width">
          <div className="sde-card-image-wrapper sde-card-image-wrapper--dsa-top">
            <div className="sde-dsa-visual-container">
              <div className="sde-dsa-left-image-box">
                <img src={topCard.image.trim()} alt={topCard.title} loading="lazy" />
              </div>
              <div className="sde-dsa-right-visual-box">
                <SlidingWindowVisual />
              </div>
            </div>
          </div>
          <div className="sde-card-info">
            <h3>{topCard.title}</h3>
            <p>{topCard.description}</p>
          </div>
        </div>

        {/* Bottom Cards Grid */}
        <div className="sde-dsa-bottom-grid">
          {gridCards.map((item) => (
            <SdeCard key={item.id} item={item} isDsaCard={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DsaSection;
