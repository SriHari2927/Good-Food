
// import React from 'react';
// import './SignIn.css'; 
// import { FaGoogle } from "react-icons/fa6";

// const SignIn = ({ isVisible, onClose }) => {
//   if (!isVisible) return null;

 


//   const handleGoogleSignIn = () => {
//     const backendUrl = process.env.REACT_APP_BACKEND_SERVER_URL;
 
//     if (!backendUrl) {
//       console.error('Backend URL is not set in environment variables.');
//       alert('Configuration error: Backend URL is missing.');
//       return;
//     }
 
//     try {
//       window.location.href = `${backendUrl}/auth/google`;
//     } catch (error) {
//       console.error('Error redirecting to Google Sign-In:', error);
//       alert('Failed to redirect to Google authentication.');
//     }
//   };
 
 





//   return (
//     <div className='sign-in-modal'>
//       <div className='sign-in-content'>
//         <button className="close-btn" onClick={onClose}>X</button>
//         <h2>Sign In</h2>
//         <div className='sign-google'> 
//         <button onClick={handleGoogleSignIn} > <FaGoogle />  SignIn with Google  </button>  </div>
       
//       </div>
//     </div>
//   );
// };

// export default SignIn;



import React, { useEffect } from 'react';
import './SignIn.css';
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const SignIn = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);

     

      
      navigate('/');
    }
  }, [navigate]);

  if (!isVisible) return null;

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
    <div className="sign-in-modal">
      <div className="sign-in-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Sign In</h2>
        <div className="sign-google">
          <button onClick={handleGoogleSignIn}>
            <FaGoogle /> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
