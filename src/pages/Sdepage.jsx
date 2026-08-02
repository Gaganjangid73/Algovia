import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";


import "./Sdepage.css";


function Sdepage() {
  return (
    <>
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <div className="Xlr-sderole-headings">
        <div className="Xlr-sderole-title">
          Master Your <span>Software Engineering</span> Interviews
        </div>
        <div className="Xlr-sderole-subtitle">
          Master System Design, Ace DSA with confidence, and Build real
          engineering skills that make companies want to hire you.
        </div>
        <div className="Xlr-sderole-tagline">
          <span>ONESTOP PLATFORM FOR ENGINEERS</span>
        </div>
      </div>

      <Searchbar
        className="xlr-Sderole-searchbar"
        inputClassName="xlr-Sderole-searchbar-input"
        iconClassName="xlr-Sderole-searchbar-icon"
        placeholder="Search Topics & Resources"
      />

      
    </>
  );
}

export default Sdepage;
