import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignIn from '../OverallHome/SignIn';


const PlanDetails = () => {
      const [error, setError] = useState('');
    
  const { planName, planType, mealType } = useParams();
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [isSignInVisible, setIsSignInVisible] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
        );

        console.log("API Response:", response.data);

        // Extract only the selected plan details
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

  const handlePlanClick = (planId) => {
    setSelectedPlanId(planId);

  };
  const handleSubscribe = async () => {
    if (!selectedPlanId) {
      alert('Please select a plan first.');
      return;
    }
 
    const token = localStorage.getItem('token');
 
    if (!token) {
      localStorage.setItem('pendingSubscription', selectedPlanId);
      setIsSignInVisible(true);
      return;
    }
    navigate(`/user/Payment/${selectedPlanId}`);
  };
  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };
 

  return (
    <div className='backgrd'>
<div className="listt">
          <h2> Choose Your Subscription Plans </h2>
        </div>
  

      <div className="sub-add">
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>

      {loading ? (
        <p>Loading...</p>
      ) : mealDetails.length > 0 ? (
        mealDetails.map((plan) => (
          <div
            key={plan.id}
            className={`plan-item ${selectedPlanId === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanClick(plan.id)}
          >
            {plan.days} Days - ₹{plan.price}
          </div>
        ))
      ) : (
        <p>No meal details found for the selected option.</p>
      )}
    {error && <div className="error">{error}</div>}
        {isSignInVisible && <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />}
 
    </div>
  );
};

export default PlanDetails;
