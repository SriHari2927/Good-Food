import React, { useEffect } from "react";
import "./Payment.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userSubscriptions, setUserSubscriptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
           {
            headers: { Authorization: `Bearer ${token}` },

        });
        console.log("GET DETAILS",response.data)
        setUserSubscriptions(response.data.userSubscriptions[0]);
      } catch (err) {
        console.error("Error fetching subscription details:", err);
        setError(
          err.response?.data?.message || "Failed to fetch subscription details"
        );
      }
    };

    fetchSubscriptionDetails();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 240000);
  };

  
 
  const planName = userSubscriptions?.Subscription?.parentPlan1?.plan_name ;
  const price = userSubscriptions?.Subscription?.PricingDetails?.price;
  const days = userSubscriptions?.Subscription?.DurationSubs?.actual_days;
  const startDate = userSubscriptions?.start_date;
  const endDate = userSubscriptions?.end_date;
  const validity = userSubscriptions?.validity_days

console.log("PLAN AND ITS DETAILS :", planName,price,days,startDate,endDate,validity)
  return (
    <>
      <div className="details-back">
        <div className="form-container">
          <h2>Subscription Details</h2>
          <br />
          <form>
            <div className="subscription-details">
              <div className="form-group">
                <label>Subscription Plan:</label>
                <span>{planName}</span>
              </div>

              <div className="form-group">
                <label>Subscription Price:</label>
                <span>
                ₹{price}


                </span>
              </div>

              <div className="form-group">
                <label>Subscription Days:</label>
                <span>
                  {days}
                </span>
              </div>

              <div className="form-group">
                <label>Starting Date:</label>
                <span>{startDate}</span>
              </div>

              <div className="form-group">
                <label>Ending Date:</label>
                <span>{endDate}</span>
              </div>

              <div className="form-group">
                <label>Subscription Validity:</label>
                <span>
                  
                 {validity}
                </span>
              </div>
            </div>
            <br />
            <br />

            <div className="subscription-details">
              <div className="payment-method">
                <div>Select Payment Method</div>
              </div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="fGoogle Pay"
                    control={<Radio />}
                    label="Google Pay"
                    sx={{ color: "black" }}
                  />
                  <FormControlLabel
                    value="Phone Pay"
                    control={<Radio />}
                    label="Phone Pay"
                    sx={{ color: "black" }}
                  />
                  <FormControlLabel
                    value="Card"
                    control={<Radio />}
                    label="Card"
                    sx={{ color: "black" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="form-group">
              <Link to={"/user/Home"}>
                <button onClick={handlePayment} className="c-t-pay">
                  {" "}
                  Checkout to Payment
                </button>{" "}
              </Link>
            </div>
            {paymentSuccess && (
              <Alert severity="success">Payment Success!</Alert>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
