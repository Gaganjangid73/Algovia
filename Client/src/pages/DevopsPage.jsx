import React from "react";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import DevopsSection from "../components/devops/DevopsSection";
import WhyUsSection from "../components/sde/WhyUsSection";
import ReviewsSection from "../components/sde/ReviewsSection";
import FounderSection from "../components/sde/FounderSection";
import FaqSection from "../components/sde/FaqSection";
import Footer from "../components/Footer";
import "./Sdepage.css";

function DevopsPage() {
  return (
    <>
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main>
        {/* DevOps Hero Section */}
        <section className="Xlr-sderole-headings">
          <h1 className="Xlr-sderole-title">
            Master Your <span>DevOps Engineering</span> Interviews
          </h1>
          <p className="Xlr-sderole-subtitle">
            Learn DevOps from basics to production and build the skills to crack interviews.
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

        {/* DevOps Engineering / Cloud Architecture Cards Section */}
        <DevopsSection />

        {/* Reusable Platform Sections */}
        <WhyUsSection />
        <ReviewsSection />
        <FounderSection />
        <FaqSection />
      </main>

      <Footer />
    </>
  );
}

export default DevopsPage;
