// import React, { useState } from 'react';
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
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

//   const handleIndividual = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCost = () => {
//     navigate('/user/individualPackBreakfast');
//   };

//   const handleCostLunch = () => {
//     navigate('/user/individualPackLunch');
//   };

//   const handleCostDinner = () => {
//     navigate('/user/individualPackDinner');
//   };

//   const showFeedbackForm = () => {
//     setIsFeedbackVisible(true);
//   };

//   const closeFeedbackForm = () => {
//     setIsFeedbackVisible(false);
//   };

//   return (
//     <>
//       <div className='food'>
//         <div className='logo-pic'>
//           <img src={logo} alt='food' style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} />
//         </div>
//         <div className='home-head'>
//           <div> Home</div>
//           <a href='#plans-section'><div> Individual Plan</div></a>
//           <a href='#plans-section'><div> Combo Budget</div></a>
//           <a href='#plans-section'><div> Combo Elite</div></a>
//           <a href='#contact-section'><div> Contact Us</div></a>
//           <div onClick={showFeedbackForm}  className ='ideas' > Ideas to Improve!</div>
//         </div>
//         <br />
//         <div className='home-header'>
//           <div> Freshly Made Home Cuisine <br /> Food Delivery Platform! </div>
//         </div>
//         <br />
//         <div className='register'>
//           <div style={{ backgroundColor: 'coral' }}> <FaListCheck /> 5.5L+ <span> Successful Orders </span> </div>
//           <div> <FaDownload /> 3.5L+ <span> Registered Customers </span></div>
//         </div>
//         <div className='regi'>
//           <div> <PiCertificateBold size={25} /> 5.5L+ <span> Certified License </span> </div>
//           <div style={{ backgroundColor: 'orange' }}> <PiChefHatBold size={25} /> 3.5L+ <span> Sellers </span></div>
//         </div>
//         <br />
//         <h1 style={{ display: 'flex', justifyContent: 'center' }}> VISION &  MISSION </h1>
//         <br />
//         <div className='vision-back'>
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
//       </div>

//       <div id='plans-section'>
//         <h1 className="home-heading"> Choose Your Plan for Subscription! </h1>
//         <div className='plans-head'>
//           <h2 className="comm">
//             Individual Pack <br />
//             <button onClick={handleIndividual}>View</button>
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

//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <button className="close-btn" onClick={closeModal}>X</button>
//               <table className="styled--table">
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
//                       <button onClick={handleCost}> Budget ₹200</button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCost}> Elite ₹300 </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostLunch}> Budget ₹200 </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostLunch}> Elite ₹300 </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostDinner}> Budget ₹200 </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostDinner}> Elite ₹300 </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//       <br /> <br /> <br />

//       <div id='contact-section'>
//         <h1 className='contact-details'> Contact Us </h1> <br />
//         <div className='footer-down'>
//           <div className='name-foot'>
//             <img className='foot' src={logo} alt='food' style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} /> <br />
//             <div> To nourish humanity with <br /> wholesome food and spread <br /> the joy of well-being. </div>
//           </div>
//           <div className='name-foot'>
//             <div className='bold-word'> Good Food App</div> <br />
//             <div> Terms and Conditions </div>
//             <div> Privacy Policy </div>
//             <div> Refund & Cancellation </div>
//             <div> FAQ </div>
//             <div> Our Team </div>
//           </div>

//           <div className='name-foot'>
//             <div className='bold-word'> Get in Touch</div> <br />
//             <div> contact@goodfood.in </div>
//             <div> +91 9459383445</div>
//           </div>
//           <div className='name-foot'>
//             <div className='bold-word'> Follow us on </div><br />
//             <div> <ImFacebook2 size={22} /> <span style={{ marginLeft: '1rem' }}> </span> <FaWhatsappSquare size={25} /> <span style={{ marginLeft: '1rem' }}> </span><FaInstagramSquare size={25} /> </div>
//             <div> <GrLinkedin size={22} /> <span style={{ marginLeft: '1rem' }}> </span> <FaTwitterSquare size={25} /> <span style={{ marginLeft: '1rem' }}> </span> <FaYoutubeSquare size={25} /></div>
//           </div>

//         </div>
//       </div>
//       <br />

//       {isFeedbackVisible && (
//         <div className='mmodal'>
//           <div className='mmodal-content'>
//             <button className="cclose-btn" onClick={closeFeedbackForm}>X</button>
//             <div className='feedback-head'>
//               <h2 style={{ color: 'orangered' }}>Give Us Feedback to Improve!</h2>
//               <br />
//               <div>
//                 <h3> Name <input type='text' /> </h3>
//               </div>
//               <div>
//                 <h3> Mobile Number <input type='number' /> </h3>
//               </div>
//               <div>
//                 <h3> Email id <input type='text' /> </h3>
//               </div>
//               <div>
//                 <h3> Comments <textarea /></h3>
//               </div>
//               <br />
//               <button className='feedback-submit'> Submit </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default MainOverallHome;

// import React from "react";

// const MainOverallHome = () => {
//   return (
//     <nav class="navbar navbar-expand-lg navbar-light bg-white">
//       <div class="container-fluid">
//         <a class="navbar-brand" href="#">
//           Navbar
//         </a>
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//             <li class="nav-item">
//               <a class="nav-link active" aria-current="page" href="#">
//                 Home
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Link
//               </a>
//             </li>
//             <li class="nav-item dropdown">
//               <a
//                 class="nav-link dropdown-toggle"
//                 href="#"
//                 id="navbarDropdown"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Dropdown
//               </a>
//               <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <li>
//                   <a class="dropdown-item" href="#">
//                     Action
//                   </a>
//                 </li>
//                 <li>
//                   <a class="dropdown-item" href="#">
//                     Another action
//                   </a>
//                 </li>
//                 <li>
//                   <a class="dropdown-item" href="#">
//                     Something else here
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             <li class="nav-item">
//               <a
//                 class="nav-link disabled"
//                 href="#"
//                 tabindex="-1"
//                 aria-disabled="true"
//               >
//                 Disabled
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainOverallHome;
























// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import './MainOverallHome.css';
// import logo from '../../../assets/Foodlogo.jpg';

// import { FaListCheck } from "react-icons/fa6";
// import { FaDownload } from "react-icons/fa";
// import { PiCertificateBold } from "react-icons/pi";
// import { PiChefHatBold } from "react-icons/pi";
// import { Link, useNavigate } from "react-router-dom";
// import { ImFacebook2 } from "react-icons/im";
// import { FaWhatsappSquare } from "react-icons/fa";
// import { FaInstagramSquare } from "react-icons/fa";
// import { GrLinkedin } from "react-icons/gr";
// import { FaTwitterSquare } from "react-icons/fa";
// import { FaYoutubeSquare } from "react-icons/fa";

// const MainOverallHome = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
//   const [parentPlans, setParentPlans] = useState([]);
// const [tiers, setTiers] = useState([]);
// const [selectedParentPlan,setSelectedParentPlan] = useState(null)


// useEffect(() => {
//   fetchParentPlans();
// }, []);
  

  
//     const fetchParentPlans = async () => {
//       try {
//         const token = localStorage.getItem('token');
  
       
  
  
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/parentPlan/getPlan`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         setParentPlans(response.data.parentPlans); 
//       } catch (error) {
//         console.error("Error fetching customer ID:", error.response?.data || error.message);
//       }
//     };



//   const fetchCommonTiers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `${process.env.REACT_APP_BACKEND_SERVER_URL}/tier/getTier`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error fetching tiers:", error);
//     }
//   };
  
//   const handleParentPlanClick = (plan) => {
//     setSelectedParentPlan(plan);
//     fetchCommonTiers();
//     setIsModalOpen(true); 
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setTiers([]);
//   };
  

  
//   const handleIndividual = () => {
//     setIsModalOpen(true);
//   };

 
//   const handleCost = () => {
//     navigate("/user/individualPackBreakfast");
//   };

//   const handleCostLunch = () => {
//     navigate("/user/individualPackLunch");
//   };

//   const handleCostDinner = () => {
//     navigate("/user/individualPackDinner");
//   };

//   const showFeedbackForm = () => {
//     setIsFeedbackVisible(true);
//   };

//   const closeFeedbackForm = () => {
//     setIsFeedbackVisible(false);
//   };

//   return (
//     <>
//       <div className="background-imageee">
//         <nav className="navbar navbar-expand-lg navbar-light">
//         <div className="logo-pic">
//           <img className="header-img" src={logo} alt="food" />
//         </div>
//           <div className="container-fluid">
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav ms-auto">
//                 <li className="nav-item">
//                   <a className="nav-link active" href="#">
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#plans-section">
//                     Individual Plan
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#plans-section">
//                     Combo Budget
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#plans-section">
//                     Combo Elite
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#contact-section">
//                     Contact Us
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" onClick={showFeedbackForm}>
//                     Ideas to Improve!
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//         {/* <div className="logo-pic">
//           <img className="header-img" src={logo} alt="food" />
//         </div> */}
//         <div className="home-header">
//           <h1>
//             Freshly Made Home Cuisine
//             <br /> Food Delivery Platform!
//           </h1>
//         </div>
//         <br />
//         <br />
//         <div className="register">
//           <div style={{ backgroundColor: "coral" }}>
//             {" "}
//             <FaListCheck /> 5.5L+ <span> Successful Orders </span>{" "}
//           </div>
//           <div>
//             {" "}
//             <FaDownload /> 3.5L+ <span> Registered Customers </span>
//           </div>
//         </div>
//         <div className="regi">
//           <div>
//             {" "}
//             <PiCertificateBold size={25} /> 5.5L+{" "}
//             <span> Certified License </span>{" "}
//           </div>
//           <div style={{ backgroundColor: "orange" }}>
//             {" "}
//             <PiChefHatBold size={25} /> 3.5L+ <span> Sellers </span>
//           </div>
//         </div>
//         <br />
//         <br />

//         <h1 className="text-center">VISION & MISSION  </h1>
//         <br />

//        <div className="vision-back">
//           <b className="vision-head"> Vision </b>          
//           <div>
//             <span style={{ marginLeft: "2rem" }}> </span>To nourish humanity
//             with wholesome food and spread the joy of well-being. Our brand
//             vision is to become the leading platform for healthy homemade food,
//             where customers can trust and rely on us to understand and care for
//             their needs while making a deeper social impact in the communities
//             we serve. We strive to be an inclusive brand, promoting healthy
//             eating lifestyles and equal opportunities for all.
//           </div>
//         </div>
//       </div>
//       <br />
//       <div className="vision-back">
//         <b className="vision-head"> Mission </b>
//         <div>
//           <span style={{ marginLeft: "2rem" }}> </span>Empowering communities
//           with accessible and nutritious mom-food through technology and home
//           kitchens. Our mission is to enable homemade food to be accessible to
//           everyone, to improve well-being through the power of technology, and
//           to unlock 100,000 home kitchens to create a better India in 2 years.
//         </div>
//       </div>
//       <br />
//       <br />
//       <br /> <br /><br/>
//       <div id="plans-section"> </div>
//       <h1 className="home-heading text-center">
//         Choose Your Plan for Subscription!
//       </h1> 
//       <br/>
//       <div className="plans-head">
//         <h2 className="comm">
//           Individual Pack <br />
//           <button onClick={handleIndividual}>View</button>
//         </h2>
//         <h2 className="comm">
//           Combo Budget Plan <br />
//           <Link to="/user/IndividualPack">
//             <button>View</button>
//           </Link>
//         </h2>
//         <h2 className="comm">
//           Combo Elite Plan <br />
//           <Link to="/user/IndividualPack">
//             <button>View</button>
//           </Link>
//         </h2>
//       </div>
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close-btn" onClick={closeModal}>
//               X
//             </button>
//             <table className="styled--table">
//               <thead>
//                 <tr>
//                   <th colSpan={2}>Breakfast</th>
//                   <th colSpan={2}>Lunch</th>
//                   <th colSpan={2}>Dinner</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <button onClick={handleCost}>Budget ₹200</button>
//                   </td>
//                   <td>
//                     <button onClick={handleCost}>Elite ₹300</button>
//                   </td>
//                   <td>
//                     <button onClick={handleCostLunch}>Budget ₹200</button>
//                   </td>
//                   <td>
//                     <button onClick={handleCostLunch}>Elite ₹300</button>
//                   </td>
//                   <td>
//                     <button onClick={handleCostDinner}>Budget ₹200</button>
//                   </td>
//                   <td>
//                     <button onClick={handleCostDinner}>Elite ₹300</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         )}
      
// <br/><br/>
// <div className="main-container">
//   <header className="header">
//     <h1>Parent Plans</h1>
//   </header>

//   {parentPlans.length > 0 ? (
//     <div className="plans-grid">
//       {parentPlans.map((plan) => (
        
//         <div key={plan.id} className="plan-card" onClick={fetchCommonTiers}>
//                     <h3>{plan.plan_name}</h3>

//           <li key={plan.id}   onClick={() => handleParentPlanClick(plan)}></li>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p>No plans available at the moment.</p>
//   )}
//   {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Tiers for {selectedParentPlan?.plan_name}</h2>
//             <div className="tier-cards">
//               {tiers.length > 0 ? (
//                 tiers.map((tier) => (
//                   <div className="tier-card" key={tier.id}>
//                     <h3>{tier.type}</h3>
//                     <p>Details about {tier.type}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No tiers available.</p>
//               )}
//             </div>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
// </div>

//       <div id='contact-section'>
//         <h1 className='contact-details text-center'>Contact Us</h1>
//         <div className='footer-down'>
//           <div className='name-foot'>
//           <img className='foot' src={logo} alt='food' />
//             {/* <img className='foot' src={logo} alt='food' style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} /> */}
//             <div>To nourish humanity with <br/> wholesome food and spread<br/> the joy of well-being.</div>

//         </div>
//       )}
//       <br />
//       <br />
//       <br/>
//       <div id="contact-section">
//         <h1 className="contact-details text-center">Contact Us</h1>
//         <br/>
//         <div className="footer-down">
//           <div className="name-foot">
//             <img className="foot" src={logo} alt="food" />
//             <div>
//               To nourish humanity with <br /> wholesome food and spread
//               <br /> the joy of well-being.
//             </div>

//           </div>
//           <div className="name-foot">
//             <div className="bold-word">Good Food App</div>
//             <div>Terms and Conditions</div>
//             <div>Privacy Policy</div>
//             <div>Refund & Cancellation</div>
//             <div>FAQ</div>
//             <div>Our Team</div>
//           </div>

//           <div className="name-foot">
//             <div className="bold-word">Get in Touch</div>
//             <div>contact@goodfood.in</div>
//             <div>+91 9459383445</div>
//           </div>

//           <div className="name-foot">
//             <div className="bold-word">Follow us on</div>
//             <div>
//               <ImFacebook2 size={22} /> <span style={{ marginLeft: "1rem" }} />{" "}
//               <FaWhatsappSquare size={25} />{" "}
//               <span style={{ marginLeft: "1rem" }} />{" "}
//               <FaInstagramSquare size={25} />
//             </div>
//             <div style={{ marginTop: "0.3rem" }}>
//               <GrLinkedin size={22} /> <span style={{ marginLeft: "1rem" }} />
//               <FaTwitterSquare size={25} />{" "}
//               <span style={{ marginLeft: "1rem" }} />{" "}
//               <FaYoutubeSquare size={25} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {isFeedbackVisible && (
//         <div className="mmodal">
//           <div className="mmodal-content">
//             <button className="cclose-btn" onClick={closeFeedbackForm}>
//               X
//             </button>
//             <div className="feedback-head">
//               <h2 style={{ color: "orangered" }}>
//                 Give Us Feedback to Improve!
//               </h2>{" "}
//               <br />
//               <div>
//                 <h4>
//                   Name <input type="text" />
//                 </h4>
//               </div>
//               <div>
//                 <h4>
//                   Mobile Number <input type="number" />
//                 </h4>
//               </div>
//               <div>
//                 <h4>
//                   Email id <input type="text" />
//                 </h4>
//               </div>
//               <div>
//                 <h4>
//                   Comments <textarea />
//                 </h4>
//               </div>
//               <button className="feedback-submit">Submit</button>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [parentPlans, setParentPlans] = useState([]);
const [tiers, setTiers] = useState([]);
const [selectedParentPlan,setSelectedParentPlan] = useState(null)
 
 
useEffect(() => {
  fetchParentPlans();
}, []);
 
 
 
    const fetchParentPlans = async () => {
      try {
        const token = localStorage.getItem('token');
 
       
 
 
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/parentPlan/getPlan`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
 
        setParentPlans(response.data.parentPlans);
      } catch (error) {
        console.error("Error fetching customer ID:", error.response?.data || error.message);
      }
    };
 
 
 
  const fetchCommonTiers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tier/getTier`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching tiers:", error);
    }
  };
 
  const handleParentPlanClick = (plan) => {
    setSelectedParentPlan(plan);
    fetchCommonTiers();
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    setTiers([]);
  };
 
 
 
  const handleIndividual = () => {
    setIsModalOpen(true);
  };
 
 
  const handleCost = () => {
    navigate('/user/individualPackBreakfast');
  };
 
  const handleCostLunch = () => {
    navigate('/user/individualPackLunch');
  };
 
  const handleCostDinner = () => {
    navigate('/user/individualPackDinner');
  };
 
  const showFeedbackForm = () => {
    setIsFeedbackVisible(true);
  };
 
  const closeFeedbackForm = () => {
    setIsFeedbackVisible(false);
  };
 
  return (
    <>
   
      <nav className="navbar navbar-expand-lg navbar-light bg-white" >
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" style={{ height: '6rem', width: '7rem', borderRadius: '5px' }} />
          </a> */}
 
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
            <button onClick={handleIndividual}>View</button>
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
       
     
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>X</button>
              <table className="styled--table">
                <thead>
                  <tr>
                    <th colSpan={2}>Breakfast</th>
                    <th colSpan={2}>Lunch</th>
                    <th colSpan={2}>Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><button onClick={handleCost}>Budget ₹200</button></td>
                    <td><button onClick={handleCost}>Elite ₹300</button></td>
                    <td><button onClick={handleCostLunch}>Budget ₹200</button></td>
                    <td><button onClick={handleCostLunch}>Elite ₹300</button></td>
                    <td><button onClick={handleCostDinner}>Budget ₹200</button></td>
                    <td><button onClick={handleCostDinner}>Elite ₹300</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
     
<br/><br/>
<div className="main-container">
  <header className="header">
    <h1>Parent Plans</h1>
  </header>
 
  {parentPlans.length > 0 ? (
    <div className="plans-grid">
      {parentPlans.map((plan) => (
       
        <div key={plan.id} className="plan-card" onClick={fetchCommonTiers}>
                    <h3>{plan.plan_name}</h3>
 
          <li key={plan.id}   onClick={() => handleParentPlanClick(plan)}></li>
        </div>
      ))}
    </div>
  ) : (
    <p>No plans available at the moment.</p>
  )}
  {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Tiers for {selectedParentPlan?.plan_name}</h2>
            <div className="tier-cards">
              {tiers.length > 0 ? (
                tiers.map((tier) => (
                  <div className="tier-card" key={tier.id}>
                    <h3>{tier.type}</h3>
                    <p>Details about {tier.type}</p>
                  </div>
                ))
              ) : (
                <p>No tiers available.</p>
              )}
            </div>
            <button onClick={closeModal}>Close</button>
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


