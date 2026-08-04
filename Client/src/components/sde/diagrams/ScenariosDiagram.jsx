import React from "react";
import gaganImg from "../../../assets/Gagan.JPG";

const ScenariosDiagram = () => {
  return (
    <div className="sde-diagram sde-diagram--scenarios">
   

      {/* Chat UI Container */}
      <div className="sde-chat-wrapper">
        {/* Top Question Message */}
        <div className="sde-chat-msg sde-chat-msg--left">
          <div className="sde-chat-avatar-box">
            <span className="sde-avatar-emoji">👦🏻</span>
          </div>
          <div className="sde-chat-bubble sde-chat-bubble--dark">
            What if two services update the same data simultaneously?
          </div>
        </div>

        {/* Bottom Answer Message */}
        <div className="sde-chat-msg sde-chat-msg--right">
          <div className="sde-chat-bubble sde-chat-bubble--blue">
            That's a race condition / lost-update. Handle it with locking, versioning or idempotency...
          </div>
          <div className="sde-chat-avatar-box sde-chat-avatar-box--gagan">
            <img src={gaganImg} alt="Gagan" className="sde-gagan-chat-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenariosDiagram;
