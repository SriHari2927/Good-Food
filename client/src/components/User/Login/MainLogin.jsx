import React, { useState } from 'react';
import './MainLogin.css';
import LoginPopup from './LoginPopup';
import { Link, useNavigate } from 'react-router-dom';




const MainLogin = () => {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate()

  const handlePopup = () => {
    navigate ('/user/LoginPopup')
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleGoogleSignIn = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER_URL;

    if (!backendUrl) {
      console.error('Backend URL is not set in environment variables.');
      alert('Configuration error: Backend URL is missing.');
      return;
    }

    try {
      window.location.href = `${backendUrl}/auth/google`;
    } catch (error) {
      console.error('Error redirecting to Google Sign-In:', error);
      alert('Failed to redirect to Google authentication.');
    }
  };


  return (
    <>  

      <Link to={'/admin/addsubscription'}>
        <button>ADMIN</button>
      </Link>

      <div className='background'>
        <div className='sign-in'>
          <h2 onClick={handleGoogleSignIn}>Sign In</h2>
          <h2>To Explore</h2>  
        </div>

        {showPopup && <LoginPopup onClose={handleClosePopup} />}
      </div>
    </>
  );
};

export default MainLogin;
