import React from "react";
import SdeCard from "./SdeCard";
import { SYSTEM_DESIGN_DATA } from "../../data/sdeContentData";

const SystemDesignSection = () => {
  return (
    <section className="Xlr-sderole-systemdesign-content" aria-labelledby="system-design-heading">
      <h2 id="system-design-heading">System Design & Architecture</h2>

      <div className="sde-systemdesign-main">
        {SYSTEM_DESIGN_DATA.map((item) => (
          <SdeCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default SystemDesignSection;
