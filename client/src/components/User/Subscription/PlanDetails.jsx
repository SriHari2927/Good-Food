import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignIn from "../OverallHome/SignIn";
import "./PlanDetails.css";
const PlanDetails = () => {
  const { planName, planType, mealType } = useParams();
  const [mealDetails, setMealDetails] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [formattedMenu, setFormattedMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const navigate = useNavigate();
  const [uniqueMealTypes, setUniqueMealTypes] = useState([]);
 
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
        );
        console.log("API Response:", response.data);
        const subscriptions = response.data.formattedSubscriptions;
 
        if (
          subscriptions &&
          subscriptions[planName] &&
          subscriptions[planName][planType] &&
          subscriptions[planName][planType][mealType]
        ) {
          setMealDetails(subscriptions[planName][planType][mealType]);
        }
      } catch (error) {
        console.log("Error fetching subscription details:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchPlans();
  }, [planName, planType, mealType]);
 
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/getMeal/${planName}/${mealType}/${planType}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Food Items Response:", response.data);
        setFoodItems(response.data.foodItems || []);
        setFormattedMenu(response.data.formattedMenu || {});
 
        // Extract unique meal types
        const mealTypesSet = new Set();
        Object.values(response.data.formattedMenu || {}).forEach((meals) => {
          Object.keys(meals).forEach((type) => mealTypesSet.add(type));
        });
 
        setUniqueMealTypes([...mealTypesSet]); // Convert Set to Array
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
 
    fetchFoodItems();
  }, [planName, mealType, planType]);
 
  const handlePlanClick = (planId) => {
    setSelectedPlanId(planId);
  };
 
  const handleSubscribe = async () => {
    if (!selectedPlanId) {
      alert("Please select a plan first.");
      return;
    }
 
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("pendingSubscription", selectedPlanId);
      setIsSignInVisible(true);
      return;
    }
    navigate(`/user/Payment/${selectedPlanId}`);
  };
 
  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };
 
  return (
    <div className="backgrd">
      <div className="choose-plan">
        <h2>Choose Your Subscription Plans</h2>
      </div>
 
      <div className="subscribe-section">
        <div className="plans-container">
          {loading ? (
            <p>Loading...</p>
          ) : mealDetails.length > 0 ? (
            mealDetails.map((plan) => (
              <div
                key={plan.id}
                className={`plan-item ${selectedPlanId === plan.id ? "selected" : ""}`}
                onClick={() => handlePlanClick(plan.id)}
              >
                {plan.days} Days - ₹{plan.price}
              </div>
            ))
          ) : (
            <p>No meal details found for the selected option.</p>
          )}
        </div>
        <div className="subscribe-button">
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </div>
 
    
      <div className="meal-type-section">
        {uniqueMealTypes.length > 0 && (
          <>
          
            <div className="meal-type-list">
              {uniqueMealTypes.map((type) => (
                <h4 key={type} className="meal-type-heading">{type}</h4>
              ))}
            </div>

          </>
        )}
      </div>
 

      <div className="menu-section">
        <div className="menu-container">
          {Object.keys(formattedMenu).length > 0 ? (
            Object.entries(formattedMenu).map(([day, meals]) => (
              <div key={day} className="menu-day">
                <h3>{day}</h3>
                {Object.entries(meals).map(([mealType, items]) => (
                  <div key={mealType} className="meal-section">
                    {/* <h4 className="meal-type-heading">{mealType}</h4> */}
                    <ul className="meal-list">
                      {items.map((item, index) => (
                        <li key={index} className="meal-item">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.food_name}
                              className="meal-image"
                            />
                          )}
                          {item.food_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No menu available.</p>
          )}
        </div>
      </div>
 
      {isSignInVisible && (
        <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} role={"USER"} />
      )}
    </div>
  );
};
 
export default PlanDetails;