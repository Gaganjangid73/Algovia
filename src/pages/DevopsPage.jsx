import React from "react";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
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
            Master <span>DevOps</span> & Cloud Engineering
          </h1>
          <p className="Xlr-sderole-subtitle">
            Master Kubernetes, Docker, CI/CD Pipelines, AWS Cloud Infrastructure, and Production Monitoring.
          </p>
          <div className="Xlr-sderole-tagline">
            <span>CLOUD & DEVOPS ENGINEERING PATH</span>
          </div>
        </section>

        {/* Global Search Bar */}
        <Searchbar
          className="xlr-Sderole-searchbar"
          inputClassName="xlr-Sderole-searchbar-input"
          iconClassName="xlr-Sderole-searchbar-icon"
          placeholder="Search K8s, Docker, CI/CD & Cloud Tools"
        />

        <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--text-secondary)" }}>
          <h2>⚡ DevOps & Cloud Engineering Module Coming Soon!</h2>
          <p style={{ marginTop: "12px", opacity: 0.8 }}>
            Designs for DevOps roadmaps, Kubernetes guides, and infrastructure sheets will be loaded here.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default DevopsPage;
