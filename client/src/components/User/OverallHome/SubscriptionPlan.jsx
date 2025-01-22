// import React, {useState} from 'react'
// import './SubscriptionPlan.css'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// const SubscriptionPlan = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleIndividuals = () => {
//         setIsModalOpen(true);
//       };


//       const closeModal = () => {
//         setIsModalOpen(false);
//       };
     
//     //   const handleIndividual = () => {
//     //     setIsModalOpen(true);
//     //   };
     
//      const navigate = useNavigate();

//       const handleCost = () => {
//         navigate('/user/individualPackBreakfast');
//       };
     
//       const handleCostLunch = () => {
//         navigate('/user/individualPackLunch');
//       };
     
//       const handleCostDinner = () => {
//         navigate('/user/individualPackDinner');
//       };

//   return (
//     <> 
    
//     <div id='plans-section'> </div>
//     <div style={{marginTop:'3rem'}}> 
//         <h1 className="home-heading text-center">Choose Your Plan for Subscription!</h1> </div>
//         <div className='plans-head'>
//           <h2 className="comm">
//             Individual Pack <br />
//             <button onClick={handleIndividuals}>View</button>
//           </h2>
//           <div style={{height:'100vh'}} > 
          
//           <div id='planss-section'> 
//           <h2 className="comm">
//             Combo Budget Plan <br />
//             <Link to="/user/BudgetCombo">
//               <button>View</button>
//             </Link>
//           </h2>
//           </div>
//           </div>
//           <div style={{height:'100vh'}} > 
//           <div id='plansss-section'> 
//           <h2 className="comm">
//             Combo Elite Plan <br />
//             <Link to="/user/EliteCombo">
//               <button>View</button>
//             </Link>
//           </h2>
//           </div>  
//         </div>  
//         </div>  


//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <button className="closee-btn" onClick={closeModal}> X</button>
//               <table className="styled---table">
//                 <thead>
//                   <tr>
//                     <th colSpan={2}> Breakfast</th>
//                     <th colSpan={2}> Lunch</th>
//                     <th colSpan={2}> Dinner</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCost}> Budget </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCost}> Elite  </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostLunch}> Budget </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostLunch}> Elite  </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostDinner}> Budget  </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostDinner}> Elite  </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//     </>
//   )
// }

// export default SubscriptionPlan



import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './MainOverallHome.css';
import logo from '../../../assets/Foodlogo.jpg';
import { FaListCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { ImFacebook2 } from "react-icons/im";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";





const SubscriptionPlan = () => {



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
   
    const handleCardClick = (planName) => {
      if (planName === 'Individual') {
        setSelectedPlan(planName);
        setIsModalOpen(true);
      } else if (planName === 'Combo Budget') {
        navigate('/user/BudgetCombo');
      } else if (planName === 'Combo Elite') {
        navigate('/user/EliteCombo');
      }
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


  return (
    <> 

<div className="main-container">
      <header className="header">
        <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
      </header>
 
      <div className="plans-grid">
        <div className="plan-card" onClick={() => handleCardClick('Individual')}>
          <h3 className="plan-name">Individual</h3>
        </div>
 
        <div className="plan-card" onClick={() => handleCardClick('Combo Budget')}>
          <h3 className="plan-name">Combo Budget</h3>
        </div>
 
       
        <div className="plan-card" onClick={() => handleCardClick('Combo Elite')}>
          <h3 className="plan-name">Combo Elite</h3>
        </div>
      </div>
 
      {isModalOpen && selectedPlan === 'Individual' && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <h3 className="modal-heading">Individual Plan</h3>
            <table className="styled-table">
             
              <tbody>
                <tr>
                  <th>Budget</th>
                  <th>Elite</th>
                 
                </tr>
                <tr>
                <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                    <button onClick={handleIndividualBreakfast} >Breakfast</button>
                   </td>
                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                     <button onClick={handleIndividualBreakfast}>Breakfast</button>
                   </td>
                 </tr>
                 <tr>
                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                     <button onClick={handleIndividualLunch} >Lunch</button>
                   </td>
                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
                     <button onClick={handleIndividualLunch} >Lunch</button>
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
               
              </tbody>
            </table>
          </div>
        </div>
      )}
</div>


    </>
  )
}

export default SubscriptionPlan