import Algovia from "../assets/Algovia.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import "./navbar.css";
import Primarybtn from "./button"
import { RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react";

const navItems = [
  {
    title: "System Design",
    subtitle: "System Design (Complete one)"
  },
  {
    title: "Data Structure & Algorithms",
    subtitle: "Master DSA Patterns & Core Concepts"
  },
  {
    title: "Software Engineering Bucket",
    subtitle: "Interview Preparation & Concepts"
  },
  {
    title: "Engineering Newsletter",
    subtitle: "System Design Stories, every week"
  }
];
const Roles = ["SDE" , "AI Engineer" , "Devops" ];

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isActive, setisActive] = useState("SDE");

  return (
    <div className="xlr-navbar">
      <div className="xlr-branding">
        <div className="xlr-logoicon">
          <img src={Algovia} alt="logo" />
        </div>
        <div className="xlr-brandtext">
          <div className="xlr-brandname">
            Algovia<span>.io</span>
          </div>
          <div className="xlr-tagline">BUILT BY ENGINEER, FOR ENGINEERS</div>
        </div>
      </div>

      <div className="xlr-navbar-item-list">
        {navItems.map((item)=>(
        <div className="xlr-navbar-item" key={item.title}>
          <div className="xlr-navbar-item-bundle">
            <div className="xlr-navbar-item-name">{item.title}</div>
            <div className="xlr-navbar-item-subname">{item.subtitle}</div>
          </div>
          <RiArrowDropDownLine className="arrow-icon" size={25}/>
        </div>
   ))}
      </div>

     <div  className="xlr-Interview-roles">
      {Roles.map((item)=>(
         <div className={isActive == item ? "xlr-Interview-roles-active" : " "} onClick={()=>setisActive(item)}>{item}</div>
      ))}
          
     </div>

      <button
        className="xlr-theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Light theme" : "Dark theme"}
      >
        {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>

      <Primarybtn className="xlr-navbtn" text="Get Started" icon={<RiArrowRightSLine  size={19}/>}/>


    </div>
  );
}

export default Navbar;
