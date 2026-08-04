import React from "react";

const LldDiagram = () => {
  return (
    <div className="sde-diagram sde-diagram--lld">
      <div className="sde-lld-grid-bg" />
      <div className="sde-lld-structure">
        
        {/* Parent Interface Box */}
        <div className="sde-lld-box sde-lld-box--interface">
          <span className="sde-lld-meta">&lt;&lt;interface&gt;&gt;</span>
          <span className="sde-lld-title">Shape</span>
          <div className="sde-lld-divider" />
          <span className="sde-lld-method">+ area(): double</span>
        </div>

        {/* Tree Line Connector */}
        <div className="sde-lld-connector">
          <div className="sde-lld-line-v" />
          <div className="sde-lld-line-h" />
        </div>

        {/* Child Subclasses Row */}
        <div className="sde-lld-children-row">
          
          {/* Circle Subclass */}
          <div className="sde-lld-box sde-lld-box--class">
            <div className="sde-lld-triangle" />
            <span className="sde-lld-title">Circle</span>
            <div className="sde-lld-divider" />
            <span className="sde-lld-formula">area = π · r²</span>
          </div>

          {/* Rectangle Subclass */}
          <div className="sde-lld-box sde-lld-box--class">
            <div className="sde-lld-triangle" />
            <span className="sde-lld-title">Rectangle</span>
            <div className="sde-lld-divider" />
            <span className="sde-lld-formula">area = w · h</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LldDiagram;
