// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import './MainOverallHome.css';
// import logo from '../../../assets/Foodlogo.jpg';
// import { FaListCheck } from "react-icons/fa6";
// import { FaDownload } from "react-icons/fa";
// import { PiCertificateBold } from "react-icons/pi";
// import { PiChefHatBold } from "react-icons/pi";
// import { Link, useNavigate } from 'react-router-dom';
// import { ImFacebook2 } from "react-icons/im";
// import { FaWhatsappSquare } from "react-icons/fa";
// import { FaInstagramSquare } from "react-icons/fa";
// import { GrLinkedin } from "react-icons/gr";
// import { FaTwitterSquare } from "react-icons/fa";
// import { FaYoutubeSquare } from "react-icons/fa";
 
// const MainOverallHome = () => {
//   const navigate = useNavigate();
//   const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [groupedSubscriptions, setGroupedSubscriptions] = useState({});

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error("Authorization token not found.");
//           return;
//         }

//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
// console.log("Response :" , response.data)
//         setGroupedSubscriptions(response.data.groupedSubscriptions);
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptions();
//   }, []);

//   const handlePlanClick = (planName) => {
//     setSelectedPlan(planName);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPlan(null);
//   };
 
 
//   const handleIndividuals = () => {
//     setIsModalOpen(true);
//   };
 
 
 
 
//   const showFeedbackForm = () => {
//     setIsFeedbackVisible(true);
//   };
 
//   const closeFeedbackForm = () => {
//     setIsFeedbackVisible(false);
//   };
 
//   const handleIndividualBreakfast = () => {
//     navigate('/user/individualPackBreakfast');
//   };
 
//   const handleIndividualLunch = () => {
//     navigate('/user/individualPackLunch');
//   };
 
//   const handleIndividualDinner = () => {
//     navigate('/user/individualPackDinner');
//   };

//   const handleComboBudget = () => {
//     navigate('/user/IndividualPack')
//   }

//   const handleComboElite = () => {
//     navigate('/user/EliteCombo')
//   }
//   return (
//     <>
   
//       <nav className="navbar navbar-expand-lg navbar-light bg-white" >
//         <div className="container-fluid">
//           {/* <a className="navbar-brand" href="#">
//             <img src={logo} alt="Logo" style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} />
//           </a> */}
 
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//           <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <a className="nav-link active" href="#">Home</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#plans-section">Individual Plan</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#plans-section">Combo Budget</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#plans-section">Combo Elite</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#contact-section">Contact Us</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" onClick={showFeedbackForm}>Ideas to Improve!</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//          <div className='logo-pic'>
//   <img className='header-img' src={logo} alt='food'  />
// </div>
       
//       <div className='home-header'>
//         <h1 className="text-center">Freshly Made Home Cuisine<br/> Food Delivery Platform!</h1>
//       </div>
 
//       <div className='register'>
//         <div style={{ backgroundColor: 'coral' }}> <FaListCheck /> 5.5L+ <span> Successful Orders </span> </div>
//         <div> <FaDownload /> 3.5L+ <span> Registered Customers </span></div>
//       </div>
//       <div className='regi'>
//         <div> <PiCertificateBold size={25} /> 5.5L+ <span> Certified License </span> </div>
//         <div style={{ backgroundColor: 'orange' }}> <PiChefHatBold size={25} /> 3.5L+ <span> Sellers </span></div>
//       </div>
 
//       <h1 className="text-center">VISION & MISSION</h1>
 
//       <div className='vision-back'>
//           <b className='vision-head'> Vision </b>
//           <div>
//             <span style={{ marginLeft: '2rem' }}> </span>To nourish humanity with wholesome food and spread the joy of well-being.
//             Our brand vision is to become the leading platform for healthy homemade food, where customers can trust and rely on us to understand and care for their needs while making a deeper social impact in the communities we serve. We strive to be an inclusive brand, promoting healthy eating lifestyles and equal opportunities for all.
//           </div>
//         </div>
//         <br />
//         <div className='vision-back'>
//           <b className='vision-head'> Mission </b>
//           <div>
//             <span style={{ marginLeft: '2rem' }}> </span>Empowering communities with accessible and nutritious mom-food through technology and home kitchens.
//             Our mission is to enable homemade food to be accessible to everyone, to improve well-being through the power of technology, and to unlock 100,000 home kitchens to create a better India in 2 years.
//           </div>
//         </div>
//         <br /><br />
             
// <br/>
 
//       <div id='plans-section'> </div>
//         <h1 className="home-heading text-center">Choose Your Plan for Subscription!</h1>
//         <div className='plans-head'>
//           <h2 className="comm">
//             Individual Pack <br />
//             <button onClick={handleIndividuals}>View</button>
//           </h2>
//           <h2 className="comm">
//             Combo Budget Plan <br />
//             <Link to="/user/IndividualPack">
//               <button>View</button>
//             </Link>
//           </h2>
//           <h2 className="comm">
//             Combo Elite Plan <br />
//             <Link to="/user/IndividualPack">
//               <button>View</button>
//             </Link>
//           </h2>
//         </div>
       
     
        

     
// <br/><br/>
// <div className="main-container">
//   <header className="header">
//     <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//   </header>

//   <div className="plans-grid">
//     <div className="plan-card" onClick={() => handlePlanClick("Individual")}>
//       <h3 className="plan-name">Individual</h3>
//     </div>
//     <div className="plan-card" onClick={() => handlePlanClick("Combo")}>
//       <h3 className="plan-name">Combo</h3>
//     </div>
//   </div>

//   {isModalOpen && selectedPlan && (
//     <div className="modal">
//       <div className="modal-content">
//         <button className="close-btn" onClick={closeModal}>
//           X
//         </button>
//         <h3 className="modal-heading">{selectedPlan} Plan</h3>
//         <table className="styled-table">
//           <thead>
//             <tr>
//               <th>Budget</th>
//               <th>Elite</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedPlan === "Individual" ? (
//               <>
//                 <tr>
//                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualBreakfast}>Breakfast</button>
//                   </td>
//                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualBreakfast}>Breakfast</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualLunch}>Lunch</button>
//                   </td>
//                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualLunch}>Lunch</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualDinner}>Dinner</button>
//                   </td>
//                   <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualDinner}>Dinner</button>
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               <tr>
//                 <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                   <button onClick={handleComboBudget}>Budget</button>
//                 </td>
//                 <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                   <button onClick={handleComboElite}>Elite</button>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )}
// </div>


       
 
//       <div id='contact-section'>
//         <h1 className='contact-details text-center'>Contact Us</h1>
//         <div className='footer-down'>
//           <div className='name-foot'>
//           <img className='foot' src={logo} alt='food' />
//             {/* <img className='foot' src={logo} alt='food' style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} /> */}
//             <div>To nourish humanity with <br/> wholesome food and spread<br/> the joy of well-being.</div>
//           </div>
 
//           <div className='name-foot'>
//             <div className='bold-word'>Good Food App</div>
//             <div>Terms and Conditions</div>
//             <div>Privacy Policy</div>
//             <div>Refund & Cancellation</div>
//             <div>FAQ</div>
//             <div>Our Team</div>
//           </div>
 
//           <div className='name-foot'>
//             <div className='bold-word'>Get in Touch</div>
//             <div>contact@goodfood.in</div>
//             <div>+91 9459383445</div>
//           </div>
 
//           <div className='name-foot'>
//             <div className='bold-word'>Follow us on</div>
//             <div>
//               <ImFacebook2 size={22} /> <FaWhatsappSquare size={25} /> <FaInstagramSquare size={25} />
//             </div>
//             <div>
//               <GrLinkedin size={22} /> <FaTwitterSquare size={25} /> <FaYoutubeSquare size={25} />
//             </div>
//           </div>
//         </div>
//       </div>
 
//       {isFeedbackVisible && (
//         <div className='mmodal'>
//           <div className='mmodal-content'>
//             <button className="cclose-btn" onClick={closeFeedbackForm}>X</button>
//             <div className='feedback-head'>
//               <h2 style={{ color: 'orangered' }}>Give Us Feedback to Improve!</h2>
//               <div><h3>Name <input type='text' /></h3></div>
//               <div><h3>Mobile Number <input type='number' /></h3></div>
//               <div><h3>Email id <input type='text' /></h3></div>
//               <div><h3>Comments <textarea /></h3></div>
//               <button className='feedback-submit'>Submit</button>
//             </div>
//           </div>
//         </div>
//       )}
     
     
//     </>
//   );
// };
 
// export default MainOverallHome;




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

  const handleCardClick = (planName) => {
    if (planName === 'Individual') {
      setSelectedPlan(planName);
      setIsModalOpen(true);
    } else if (planName === 'Combo Budget') {
      navigate('/user/IndividualPack');
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
   
      <nav className="navbar navbar-expand-lg navbar-light bg-white" >
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
                <a className="nav-link" href="#plans-section">Combo Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plans-section">Combo Elite</a>
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
       
      <div className='home-header'>
        <h1 className="text-center">Freshly Made Home Cuisine<br/> Food Delivery Platform!</h1>
      </div>
 
      <div className='register'>
        <div style={{ backgroundColor: 'coral' }}> <FaListCheck /> 5.5L+ <span> Successful Orders </span> </div>
        <div> <FaDownload /> 3.5L+ <span> Registered Customers </span></div>
      </div>
      <div className='regi'>
        <div> <PiCertificateBold size={25} /> 5.5L+ <span> Certified License </span> </div>
        <div style={{ backgroundColor: 'orange' }}> <PiChefHatBold size={25} /> 3.5L+ <span> Sellers </span></div>
      </div>
 
      <h1 className="text-center">VISION & MISSION</h1>
 
      <div className='vision-back'>
          <b className='vision-head'> Vision </b>
          <div>
            <span style={{ marginLeft: '2rem' }}> </span>To nourish humanity with wholesome food and spread the joy of well-being.
            Our brand vision is to become the leading platform for healthy homemade food, where customers can trust and rely on us to understand and care for their needs while making a deeper social impact in the communities we serve. We strive to be an inclusive brand, promoting healthy eating lifestyles and equal opportunities for all.
          </div>
        </div>
        <br />
        <div className='vision-back'>
          <b className='vision-head'> Mission </b>
          <div>
            <span style={{ marginLeft: '2rem' }}> </span>Empowering communities with accessible and nutritious mom-food through technology and home kitchens.
            Our mission is to enable homemade food to be accessible to everyone, to improve well-being through the power of technology, and to unlock 100,000 home kitchens to create a better India in 2 years.
          </div>
        </div>
        <br /><br />
             
<br/>
 
      <div id='plans-section'> </div>
        <h1 className="home-heading text-center">Choose Your Plan for Subscription!</h1>
        <div className='plans-head'>
          <h2 className="comm">
            Individual Pack <br />
            <button onClick={handleIndividuals}>View</button>
          </h2>
          <h2 className="comm">
            Combo Budget Plan <br />
            <Link to="/user/IndividualPack">
              <button>View</button>
            </Link>
          </h2>
          <h2 className="comm">
            Combo Elite Plan <br />
            <Link to="/user/IndividualPack">
              <button>View</button>
            </Link>
          </h2>
        </div>
       
     
        

     
<br/><br/>
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


       
 
      <div id='contact-section'>
        <h1 className='contact-details text-center'>Contact Us</h1>
        <div className='footer-down'>
          <div className='name-foot'>
          <img className='foot' src={logo} alt='food' />
            {/* <img className='foot' src={logo} alt='food' style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} /> */}
            <div>To nourish humanity with <br/> wholesome food and spread<br/> the joy of well-being.</div>
          </div>
 
          <div className='name-foot'>
            <div className='bold-word'>Good Food App</div>
            <div>Terms and Conditions</div>
            <div>Privacy Policy</div>
            <div>Refund & Cancellation</div>
            <div>FAQ</div>
            <div>Our Team</div>
          </div>
 
          <div className='name-foot'>
            <div className='bold-word'>Get in Touch</div>
            <div>contact@goodfood.in</div>
            <div>+91 9459383445</div>
          </div>
 
          <div className='name-foot'>
            <div className='bold-word'>Follow us on</div>
            <div>
              <ImFacebook2 size={22} /> <FaWhatsappSquare size={25} /> <FaInstagramSquare size={25} />
            </div>
            <div>
              <GrLinkedin size={22} /> <FaTwitterSquare size={25} /> <FaYoutubeSquare size={25} />
            </div>
          </div>
        </div>
      </div>
 
      {isFeedbackVisible && (
        <div className='mmodal'>
          <div className='mmodal-content'>
            <button className="cclose-btn" onClick={closeFeedbackForm}>X</button>
            <div className='feedback-head'>
              <h2 style={{ color: 'orangered' }}>Give Us Feedback to Improve!</h2>
              <div><h3>Name <input type='text' /></h3></div>
              <div><h3>Mobile Number <input type='number' /></h3></div>
              <div><h3>Email id <input type='text' /></h3></div>
              <div><h3>Comments <textarea /></h3></div>
              <button className='feedback-submit'>Submit</button>
            </div>
          </div>
        </div>
      )}
     
     
    </>
  );
};
 
export default MainOverallHome;
