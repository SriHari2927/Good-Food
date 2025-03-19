// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./SubscriptionPlan.css";
 
// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState({});
//   const [selectedPlan, setSelectedPlan] = useState(null);
 
//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
//         );
//         console.log("Fetched plans:",response.data)
//         setSubscriptions(response.data.formattedSubscriptions || {});
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.message);
//       }
//     };
 
//     fetchSubscriptions();
//   }, []);
 
//   const handlePlanClick = (planName) => {
//     setSelectedPlan(planName);
//   };
 
//   const handleClosePopup = () => {
//     setSelectedPlan(null);
//   };
 
//   const handleMealClick = (planName, planType, meal) => {
//     if (planName === "Individual Plan") {
//       navigate(`/user/IndividualPack${meal}${planType}`);
//     } else if (planName === "Combo Plan") {
//       if (planType === "Budget") {
//         navigate("/user/BudgetCombo");
//       } else if (planType === "Elite") {
//         navigate("/user/EliteCombo");
//       }
//     }
//   };
 
//   return (
//     <section className="subscription-container">
//       <header className="header">
//         <h1 className="choose">Choose Your Plan for Subscription!</h1>
//       </header>
 
//       {/* Individual Plan Section */}
//       <div className="plan-section">
//         <div className="description-card">
 
//           <p> Individual Plan - You can subscribe to only one meal (Breakfast, Lunch, or Dinner).</p>
//           {subscriptions["Individual Plan"] && (
//           <div className="plan-card" onClick={() => handlePlanClick("Individual Plan")}>
//             <h2 className="plan-name">Individual Plan</h2>
//           </div>
//         )}
//         </div>
//       </div>
 
//       {/* Combo Plan Section */}
//       <div className="plan-section">
//         <div className="description-card">
         
//           <p>Combo Plan - This plan includes all three meals: Breakfast, Lunch, and Dinner.</p>
//           {subscriptions["Combo Plan"] && (
//           <div className="plan-card" onClick={() => handlePlanClick("Combo Plan")}>
//             <h2 className="plan-name">Combo Plan</h2>
//           </div>
//         )}
//         </div>
 
//       </div>
 
//       {/* Popup for Plan Details */}
//       {selectedPlan && subscriptions[selectedPlan] && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <h2>{selectedPlan}</h2>
//             <div className="plans-details">
//               {Object.entries(subscriptions[selectedPlan]).map(([planType, meals]) => (
//                 <div key={planType} className="plan-type">
//                   <h3>{planType}</h3>
//                   <div className="meals-container">
//                     {[...new Set(meals.map(({ meal_type }) => meal_type))].map((meal_type) => (
//                       <div
//                         key={meal_type}
//                         className="meal-card"
//                         onClick={() => handleMealClick(selectedPlan, planType, meal_type)}
//                       >
//                         {meal_type}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
 
// export default SubscriptionPlan;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPlan.css";

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
        );
        console.log("Fetched plans:", response.data);
        setSubscriptions(response.data.formattedSubscriptions || {});
      } catch (error) {
        console.error("Error fetching subscriptions:", error.message);
      }
    };

    fetchSubscriptions();
  }, []);

  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
  };

  const handleClosePopup = () => {
    setSelectedPlan(null);
  };

  const handleMealClick = (planName, planType, mealType) => {
    navigate(`/user/${planName}/${planType}/${mealType}`);
  };

  return (
    <section className="subscription-container">
      <header className="header">
        <h1 className="choose">Choose Your Plan for Subscription!</h1>
      </header>

      {Object.keys(subscriptions).map((planName) => (
        <div className="plan-section" key={planName}>
          <div className="description-card">
            <p>{planName} - Select your meal type</p>
            <div className="plan-card" onClick={() => handlePlanClick(planName)}>
              <h2 className="plan-name">{planName}</h2>
            </div>
          </div>
        </div>
      ))}

      {/* Popup for selecting meals */}
      {selectedPlan && subscriptions[selectedPlan] && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <h2>{selectedPlan}</h2>
            <div className="plans-details">
              {Object.entries(subscriptions[selectedPlan]).map(([planType, meals]) => (
                <div key={planType} className="plan-type">
                  <h3>{planType}</h3>
                  <div className="meals-container">
                    {Object.keys(meals).map((mealType) => (
                      <div
                        key={mealType}
                        className="meal-card"
                        onClick={() => handleMealClick(selectedPlan, planType, mealType)}
                      >
                        {mealType}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubscriptionPlan;