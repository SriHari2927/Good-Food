import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './MainOverallHome.css';
import logo from '../../../assets/Foodlogo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionPlan from './SubscriptionPlan';
import ContactUs from './ContactUs';
import LicenseContent from './LicenseContent';
import IdeasToImprove from './IdeasToImprove';
import Vision from './Vision';
 
 
const MainOverallHome = () => {
  const navigate = useNavigate();
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
 
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Authorization token not found.");
          return;
        }
 
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
          headers: { Authorization: `Bearer ${token}` },
        });
console.log("Response :" , response.data)
        setGroupedSubscriptions(response.data.groupedSubscriptions);
      } catch (error) {
        console.error("Error fetching subscriptions:", error.response?.data || error.message);
      }
    };
 
    fetchSubscriptions();
  }, []);
 
  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };
 
 
  const handleIndividuals = () => {
    setIsModalOpen(true);
  };
 
  const showFeedbackForm = () => {
   
    setIsFeedbackVisible(true);
  };
 
  const closeFeedbackForm = () => {
    setIsFeedbackVisible(false);
  };
 
  const handleIndividualBreakfast = () => {
    navigate('/user/individualPackBreakfast');
  };
 
  const handleIndividualLunch = () => {
    navigate('/user/individualPackLunch');
  };
 
  const handleIndividualDinner = () => {
    navigate('/user/individualPackDinner');
  };
 
  const handleComboBudget = () => {
    navigate('/user/IndividualPack')
  }
 
  const handleComboElite = () => {
    navigate('/user/EliteCombo')
  }
  return (
    <>  
    <div className='food'>
         <nav className="navbar navbar-expand-lg navbar-light " >
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
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plans-section">Individual Plan</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#planss-section">Combo Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plansss-section">Combo Elite</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact-section">Contact Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={showFeedbackForm}>Ideas to Improve!</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
<div className='logo-pic'>
  <img className='header-img' src={logo} alt='food'  />
</div>      
        < LicenseContent />
        < Vision/>
        </div>
        < SubscriptionPlan />
        < ContactUs />  
       
        <IdeasToImprove isVisible={isFeedbackVisible} onClose={closeFeedbackForm} />
       
<br/> <br/>
 
{/* <div className="main-container">
  <header className="header">
    <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
  </header>
  <div className="plans-grid">
    <div className="plan-card" onClick={() => handlePlanClick("Individual")}>
      <h3 className="plan-name">Individual</h3>
    </div>
    <div className="plan-card" onClick={() => handlePlanClick("Combo")}>
      <h3 className="plan-name">Combo</h3>
    </div>
  </div>
  {isModalOpen && selectedPlan && (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <h3 className="modal-heading">{selectedPlan} Plan</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Budget</th>
              <th>Elite</th>
            </tr>
          </thead>
          <tbody>
            {selectedPlan === "Individual" ? (
              <>
                <tr>
                  <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualBreakfast}>Breakfast</button>
                  </td>
                  <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualBreakfast}>Breakfast</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualLunch}>Lunch</button>
                  </td>
                  <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualLunch}>Lunch</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualDinner}>Dinner</button>
                  </td>
                  <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualDinner}>Dinner</button>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                  <button onClick={handleComboBudget}>Budget</button>
                </td>
                <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                  <button onClick={handleComboElite}>Elite</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div> */}
 
 
 
    </>
  );
};
 
export default MainOverallHome;
