// import React, { useState, useEffect } from "react";
// import "./Payment.css";
// import Alert from "@mui/material/Alert";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Payment = () => {
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [userSubscriptions, setUserSubscriptions] = useState(null);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone_number: '',
//     landmark: '',
//     street: '',
//     city: '',
//     pincode: '',
//   });
//   const [successMessage, setSuccessMessage] = useState(null);
//   useEffect(() => {
//     const fetchSubscriptionDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("GET DETAILS", response.data);
//         setUserSubscriptions(response.data.userSubscriptions[0]);
//       } catch (err) {
//         console.error("Error fetching subscription details:", err);
//         setError(
//           err.response?.data?.message || "Failed to fetch subscription details"
//         );
//       }
//     };

//     fetchSubscriptionDetails();
//   }, []);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/createPhone`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("QQQQQQQQQ",response.data)
//       setSuccessMessage(response.data.message);
//       setFormData({
//         name: "",
//         email: "",
//         phone_number: "",
//         landmark: "",
//         street: "",
//         city: "",
//         pincode: "",
//       });
//     } catch (error) {
//       console.error("Error submitting address:", error);
//       setError(error.response?.data?.message || "Failed to submit address");
//     }
//   };

//   if (error) {
//     return <Alert severity="error">{error}</Alert>;
//   }

//   const handlePayment = () => {
//     setPaymentSuccess(true);
//     setTimeout(() => {
//       setPaymentSuccess(false);
//     }, 240000);
//   };

//   // const handlePlanChange = (event) => {
//   //   setSubscriptionPlan(event.target.value);
//   // };

//   const planName = userSubscriptions?.Subscription?.parentPlan1?.plan_name;
//   const price = userSubscriptions?.Subscription?.PricingDetails?.price;
//   const days = userSubscriptions?.Subscription?.DurationSubs?.actual_days;
//   const startDate = userSubscriptions?.start_date;
//   const endDate = userSubscriptions?.end_date;
//   const validity = userSubscriptions?.validity_days;

//   console.log(
//     "PLAN AND ITS DETAILS :",
//     planName,
//     price,
//     days,
//     startDate,
//     endDate,
//     validity
//   );

//   return (
//     <>
//       <div className="details-back">
//         <div className="form-container">
//           <h2>Subscription Details</h2>
//           <br />
//           <form onSubmit={handleFormSubmit}>
//             <div className="subscription-details">
//               <div className="form-group">
//                 <label>Subscription Plan:</label>
//                 <span>{planName}</span>
//               </div>

//               <div className="form-group">
//                 <label>Subscription Price:</label>
//                 <span>₹{price}</span>
//               </div>

//               <div className="form-group">
//                 <label>Subscription Days:</label>
//                 <span>{days} Days</span>
//               </div>

//               <div className="form-group">
//                 <label>Starting Date:</label>
//                 <span>{startDate}</span>
//               </div>

//               <div className="form-group">
//                 <label>Ending Date:</label>
//                 <span>{endDate}</span>
//               </div>

//               <div className="form-group">
//                 <label>Subscription Validity:</label>
//                 <span>{validity} Days</span>
//               </div>
//             </div>
//             <br />
//             <br />
//             <div className="details-back">
//               <div className="form-container">
//                 <h2>Food Delivery Details</h2>
//                 <br />
//                 <form>
//                   <div className="form-group">
//                     <label>Customer ID:</label>
//                     <span>
//                       <input />
//                     </span>
//                   </div>
//                   <div className="form-group">
//                     <label>Name:</label>
//                     <input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Email ID:</label>
//                     <input
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Phone Number:</label>
//                     <input
//                       name="phone_number"
//                       value={formData.phone_number}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Delivery Address 1:</label>
//                     <input
//                       name="landmark"
//                       value={formData.landmark}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Street:</label>
//                     <input
//                       name="street"
//                       value={formData.street}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>City:</label>
//                     <input
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Pincode:</label>
//                     <input
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   {/* {(subscriptionPlan === "Combo" ||
//                     subscriptionPlan === "ComboElite") && (
//                     <>
//                       <div className="form-group">
//                         <label>Delivery Address 2:</label>
//                         <span>
//                           <input />
//                         </span>
//                       </div>
//                       <div className="form-group">
//                         <label>Street :</label>
//                         <span>
//                           <input />
//                         </span>
//                       </div>
//                       <div className="form-group">
//                         <label>City:</label>
//                         <span>
//                           <textarea />
//                         </span>
//                       </div>
//                       <div className="form-group">
//                         <label>Pincode :</label>
//                         <span>
//                           <input />
//                         </span>
//                       </div>
//                     </>
//                   )} */}

//                   <button type="submit" className="submit-color">
//                     Submit
//                   </button>
//                   {successMessage && (
//                     <Alert severity="success">{successMessage}</Alert>
//                   )}
//                   <br />
//                 </form>
//               </div>
//             </div>

//             <div className="form-group">
//               <Link to={"/user/MoneyTransfer"}>
//                 <button onClick={handlePayment} className="c-t-pay">
//                   Checkout to Payment
//                 </button>
//               </Link>
//             </div>
//             {paymentSuccess && (
//               <Alert severity="success">Payment Success!</Alert>
//             )}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Payment;



// import React, { useState, useEffect } from "react";
// import "./Payment.css";
// import Alert from "@mui/material/Alert";
// import axios from "axios";

// const Payment = () => {
//   const [userSubscriptions, setUserSubscriptions] = useState(null);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     landmark: "",
//     street: "",
//     city: "",
//     pincode: "",
//   });
//   const [successMessage, setSuccessMessage] = useState(null);

//   useEffect(() => {
//     const fetchSubscriptionDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("User Details : ", response.data)
//         setUserSubscriptions(response.data.userSubscriptions[1]);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch subscription details");
//       }
//     };
//     fetchSubscriptionDetails();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/createPhone`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("Form Submitted ", response.data)
//       setSuccessMessage(response.data.message);
//       setFormData({
//         name: "",
//         email: "",
//         phone_number: "",
//         landmark: "",
//         street: "",
//         city: "",
//         pincode: "",
//       });
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to submit address");
//     }
//   };

//   if (error) {
//     return <Alert severity="error">{error}</Alert>;
//   }

//   const planName = userSubscriptions?.Subscription?.parentPlan1?.plan_name;
//   const price = userSubscriptions?.Subscription?.PricingDetails?.price;
//   const days = userSubscriptions?.Subscription?.DurationSubs?.actual_days;
//   const startDate = userSubscriptions?.start_date;
//   const endDate = userSubscriptions?.end_date;
//   const validity = userSubscriptions?.validity_days;

//   return (
//     <div className="details-back">
//       <div className="form-container">
//         <h2>Subscription Details</h2>
//         <form onSubmit={handleFormSubmit} noValidate>
//           <div className="subscription-details">
//             <div className="form-group">
//               <label>Subscription Plan:</label>
//               <span>{planName}</span>
//             </div>
//             <div className="form-group">
//               <label>Subscription Price:</label>
//               <span>₹{price}</span>
//             </div>
//             <div className="form-group">
//               <label>Subscription Days:</label>
//               <span>{days} Days</span>
//             </div>
//             <div className="form-group">
//               <label>Starting Date:</label>
//               <span>{startDate}</span>
//             </div>
//             <div className="form-group">
//               <label>Ending Date:</label>
//               <span>{endDate}</span>
//             </div>
//             <div className="form-group">
//               <label>Subscription Validity:</label>
//               <span>{validity} Days</span>
//             </div>
//           </div>

//           <h2>Food Delivery Details</h2>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email ID:</label>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number:</label>
//             <input
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Landmark:</label>
//             <input
//               name="landmark"
//               value={formData.landmark}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Street:</label>
//             <input
//               name="street"
//               value={formData.street}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>City:</label>
//             <input
//               name="city"
//               value={formData.city}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Pincode:</label>
//             <input
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleInputChange}
//             />
//           </div>

//           <button type="submit" className="submit-color">
//             Submit
//           </button>
//           {successMessage && <Alert severity="success">{successMessage}</Alert>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;





import React, { useState, useEffect } from "react";
import "./Payment.css";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    landmark: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("User Details:", response.data);
        const subscriptions = response.data.userSubscriptions;
        setUserSubscriptions(subscriptions);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch subscription details");
      }
    };
    fetchSubscriptionDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/createPhone`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Form Submitted:", response.data);
      alert("Form Submitted Succesfully")
      navigate('/user/MoneyTransfer')
      setSuccessMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        landmark: "",
        street: "",
        city: "",
        pincode: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit address");
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const recentPlan = userSubscriptions[userSubscriptions.length - 1];

  const planName = recentPlan?.Subscription?.parentPlan1?.plan_name || "N/A";
  const price = recentPlan?.Subscription?.PricingDetails?.price || "N/A";
  const days = recentPlan?.Subscription?.DurationSubs?.actual_days || "N/A";
  const startDate = recentPlan?.start_date || "N/A";
  const endDate = recentPlan?.end_date || "N/A";
  const validity = recentPlan?.validity_days || "N/A";

  return (
    <div className="details-back">
      <div className="form-container">
        <h2>Subscription Details</h2>
        <form onSubmit={handleFormSubmit} noValidate>
          <div className="subscription-details">
            <div className="form-group">
              <label>Subscription Plan:</label>
              <span>{planName}</span>
            </div>
            <div className="form-group">
              <label>Subscription Price:</label>
              <span>₹{price}</span>
            </div>
            <div className="form-group">
              <label>Subscription Days:</label>
              <span>{days} Days</span>
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
              <span>{validity} Days</span>
            </div>
          </div>

          <h2>Food Delivery Details</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email ID:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Landmark:</label>
            <input
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Street:</label>
            <input
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Pincode:</label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-color">
            Submit
          </button>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default Payment;
