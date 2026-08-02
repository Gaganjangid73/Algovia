import React from "react";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import AiStepPathSection from "../components/ai/AiStepPathSection";
import AiExplorerSection from "../components/ai/AiExplorerSection";
import FeatureShowcaseSection from "../components/sde/FeatureShowcaseSection";
import WhyUsSection from "../components/sde/WhyUsSection";
import ReviewsSection from "../components/sde/ReviewsSection";
import FounderSection from "../components/sde/FounderSection";
import FaqSection from "../components/sde/FaqSection";
import Footer from "../components/Footer";
import "./Sdepage.css";

function AiPage() {
  return (
    <>
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main>
        {/* AI Hero Section */}
        <section className="Xlr-sderole-headings">
          <h1 className="Xlr-sderole-title">
            Master Your <span>AI Engineering</span> Interviews
          </h1>
          <p className="Xlr-sderole-subtitle">
            Learn AI Engineering from basics to production and build the skills needed to crack interviews and create real AI applications.
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
          placeholder="Search topics & resources..."
        />

        {/* Step 1 & Step 2 Learning Path Section */}
        <AiStepPathSection />

        {/* AI Engineering (Complete One) Interactive Step Explorer */}
        <AiExplorerSection />

        {/* Reusable Platform Sections */}
        <FeatureShowcaseSection />
        <WhyUsSection />
        <ReviewsSection />
        <FounderSection />
        <FaqSection />
      </main>

      <Footer />
    </>
  );
}

export default AiPage;
