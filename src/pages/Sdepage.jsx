import React from "react";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import SystemDesignSection from "../components/sde/SystemDesignSection";
import DsaSection from "../components/sde/DsaSection";
import FeatureShowcaseSection from "../components/sde/FeatureShowcaseSection";
import WhyUsSection from "../components/sde/WhyUsSection";
import ReviewsSection from "../components/sde/ReviewsSection";
import FounderSection from "../components/sde/FounderSection";
import FaqSection from "../components/sde/FaqSection";
import Footer from "../components/Footer";
import "./Sdepage.css";

/**
 * Main SDE Interview Preparation Page
 */
function Sdepage() {
  return (
    <>
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main>
        {/* Hero Section */}
        <section className="Xlr-sderole-headings">
          <h1 className="Xlr-sderole-title">
            Master Your <span>Software Engineering</span> Interviews
          </h1>
          <p className="Xlr-sderole-subtitle">
            Master System Design, Ace DSA with confidence, and Build real
            engineering skills that make companies want to hire you.
          </p>
          <div className="Xlr-sderole-tagline">
            <span>ONESTOP PLATFORM FOR ENGINEERS</span>
          </div>
        </section>

        {/* Global Search Bar */}
        <Searchbar
          className="xlr-Sderole-searchbar"
          inputClassName="xlr-Sderole-searchbar-input"
          iconClassName="xlr-Sderole-searchbar-icon"
          placeholder="Search Topics & Resources"
        />

        {/* Core Curriculum Sections */}
        <SystemDesignSection />
        <DsaSection />
        <FeatureShowcaseSection />
        <WhyUsSection />
        <ReviewsSection />
        <FounderSection />
        <FaqSection />
      </main>

      {/* Global Footer Component */}
      <Footer />
    </>
  );
}

export default Sdepage;
