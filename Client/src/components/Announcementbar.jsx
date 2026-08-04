import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./Announcementbar.css";

function AnnouncementBar() {
  return (
    <div className="announcement">
      <span className="announcement-text">
        Unlock everything on Algovia.io with one subscription — no restrictions.
      </span>
      <span className="xlr-access">
        Get Full Access <FaLongArrowAltRight />
      </span>
    </div>
  );
}

export default AnnouncementBar;