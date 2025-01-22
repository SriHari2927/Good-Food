
import React, { useState } from 'react';
import './LicenseContent.css';
import { FaListCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";
import SignIn from './SignIn'; 
import { Link } from 'react-router-dom';

const LicenseContent = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const handleSignInClick = () => {
    setIsSignInVisible(true);
  };

  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };

  return (
    <> 
      <div className='signing-in'>  
        <button onClick={handleSignInClick}> Sign In </button> <span> </span>
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
    </>
  );
};

export default LicenseContent;
