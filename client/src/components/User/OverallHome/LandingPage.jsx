import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../../assets/Foodlogo.jpg";
import './LandingPage.css'
 
import { FaListCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";
import SignIn from './SignIn';
import { Link } from 'react-router-dom';
 
 
const LandingPage = () => {
 
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
 
    const [isSignInVisible, setIsSignInVisible] = useState(false);
 
 
 
  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };
 
   
    const showFeedbackForm = () => {
      setIsFeedbackVisible(true);
    };
 
  
 
  return (
    <>
    <section className="landing-header">
        <nav className="navbarrr navbar-expand-lg navbar-light ">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#plans-section">
                    Individual Plan
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#planss-section">
                    Combo Budget
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#plansss-section">
                    Combo Elite
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact-section">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={showFeedbackForm}>
                    Ideas to Improve!
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="logo-pic">
          <img className="header-img" src={logo} alt="food" />
        </div>
 
 
 
        <div className='signing-in'>  
        <Link to={'/admin/addsubscription'}>
        <button> Admin </button> </Link>
      </div>
 
 
        <div className='home-header'>
        <h1 className='food-delivery'>Freshly Made Home Cuisine<br/> Food Delivery Platform!</h1>
      </div>  
      <div className='register'>
        <div style={{ backgroundColor: 'coral' }}>
          <FaListCheck /> 5.5L+ <span> Successful Orders </span>
        </div>
        <div>
          <FaDownload /> 3.5L+ <span> Registered Customers </span>
        </div>
      </div>
      <div className='regi'>
        <div>
          <PiCertificateBold size={25} /> 5.5L+ <span> Certified License </span>
        </div>
        <div style={{ backgroundColor: 'orange' }}>
          <PiChefHatBold size={25} /> 3.5L+ <span> Sellers </span>
        </div>
      </div>
      <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />
           
      </section>
   
    </>
  )
}
 
export default LandingPage
 