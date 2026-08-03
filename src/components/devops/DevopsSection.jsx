import React, { useState, useEffect } from "react";
import DevopsCard from "./DevopsCard";
import { fetchDevopsPageCardsData } from "../../data/devopsContentData";
import "./DevopsSection.css";

function DevopsSection() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadCards = async () => {
      try {
        const data = await fetchDevopsPageCardsData();
        if (isMounted) {
          setCards(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load DevOps page cards:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadCards();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || cards.length === 0) return null;

  return (
    <section className="xlr-devops-showcase-section">
      <div className="xlr-devops-showcase-container">
        {/* Centered Section Heading matching exact design */}
        <h2 className="xlr-devops-showcase-heading">
          DevOps Engineering / Cloud Architecture
        </h2>

        {/* 3-Card Centered Grid */}
        <div className="xlr-devops-card-grid">
          {cards.map((card) => (
            <DevopsCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DevopsSection;
