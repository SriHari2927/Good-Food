
// import React from 'react';
// import './AddDetails.css'

// const AddDetails = () => {
//   return (
//     <>
//     <div className='details-back'> 
    
    
//       <div className="form-container">
//       <h2 >Add Profile</h2>
//         <form >
//           <div className="form-group">
//             <label >Name</label>
//             <input 
//               type="text" 
             
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Email ID</label>
//             <input 
             
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label >Phone Number</label>
//             <input 
              
//               required 
//             />
//           </div>

//           <div className="form-group">
//             <label >Delivery Address 1</label>
//             <textarea 
             
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Delivery Address 2</label>
//             <textarea 
             
//             />
//           </div>

//           {/* <div className="form-group">
//             <label htmlFor="subscriptionPlan">Subscription Plan</label>
//             <input 
//               type="text" 
             
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="paymentType">Payment Type</label>
//             <input type="text"
//               required
//             />
//           </div> */}


// <div className="form-group">
//               <label >Subscription Plan</label>
//               <select required>
//                 <option value="">Select Plan</option>
//                 <option value="individual">Individual</option>
//                 <option value="budget">Budget</option>
//                 <option value="elite">Elite</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label >Payment Type</label>
            
//               <select  required>
//                 <option value="">Select Payment Type</option>
//                 <option value="googlePay">Google Pay</option>
//                 <option value="paytm">Paytm</option>
//                 <option value="card">Card</option>
//               </select>
//             </div>

//           <div className="form-group">
//             <button >Submit</button>
//           </div>
//         </form>
//       </div>
//       </div>
//     </>
//   );
// };

// export default AddDetails;






// import React, { useState } from 'react';
// import './AddDetails.css';
// import { Link } from 'react-router-dom';

// const AddDetails = () => {
//   const [subscription, setSubscription] = useState('');
//   const [payment, setPayment] = useState('');
//   const [showPlanDropdown, setShowPlanDropdown] = useState(false);
//   const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

//   const handlePlanChange = (e) => {
//     setSubscription(e.target.value);
//     setShowPlanDropdown(false); 
//   };

//   const handlePaymentChange = (e) => {
//     setPayment(e.target.value);
//     setShowPaymentDropdown(false); 
//   };

//   return (
//     <>
//       <div className='details-back'>
//         <div className="form-container">
//           <h2>Add Profile</h2>
//           <form>
//             <div className="form-group">
//               <label>Name</label>
//               <input type="text" required />
//             </div>

//             <div className="form-group">
//               <label>Email ID</label>
//               <input type="email" required />
//             </div>

//             <div className="form-group">
//               <label>Phone Number</label>
//               <input type="tel" required />
//             </div>

//             <div className="form-group">
//               <label>Delivery Address 1</label>
//               <textarea required />
//             </div>

//             <div className="form-group">
//               <label>Delivery Address 2</label>
//               <textarea />
//             </div>

           
//             <div className="form-group">
//               <label>Subscription Plan</label>
//               <div className="input-dropdown">
//                 <input
//                   type="text"
//                   value={subscription}
//                   onClick={() => setShowPlanDropdown(!showPlanDropdown)}
//                   onChange={(e) => setSubscription(e.target.value)}
//                   required
//                   placeholder="Select a plan"
//                 />
//                 {showPlanDropdown && (
//                   <div className="dropdown-options">
//                     <div className="dropdown-option" onClick={() => handlePlanChange({ target: { value: 'Individual' } })}>
//                       Individual
//                     </div>
//                     <div className="dropdown-option" onClick={() => handlePlanChange({ target: { value: 'Budget' } })}>
//                       Budget
//                     </div>
//                     <div className="dropdown-option" onClick={() => handlePlanChange({ target: { value: 'Elite' } })}>
//                       Elite
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>         
//             <div className="form-group">
//               <label>Payment Type</label>
//               <div className="input-dropdown">
//                 <input
//                   type="text"
//                   value={payment}
//                   onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
//                   onChange={(e) => setPayment(e.target.value)}
//                   required
//                   placeholder="Select payment type"
//                 />
//                 {showPaymentDropdown && (
//                   <div className="dropdown-options">
//                     <div className="dropdown-option" onClick={() => handlePaymentChange({ target: { value: 'Google Pay' } })}>
//                       Google Pay
//                     </div>
//                     <div className="dropdown-option" onClick={() => handlePaymentChange({ target: { value: 'Paytm' } })}>
//                       Paytm
//                     </div>
//                     <div className="dropdown-option" onClick={() => handlePaymentChange({ target: { value: 'Card' } })}>
//                       Card
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="form-group">
//               <button type="submit">Submit</button> 
//               <Link to={'/Payment'}>
//               <button style={{marginLeft:'15rem'}}> Checkout to Payment</button> </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddDetails;








import React, { useState } from 'react';
import './AddDetails.css';
import { Link } from 'react-router-dom';

const AddDetails = () => {
  const [subscription, setSubscription] = useState('');
  const [payment, setPayment] = useState('');
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const handlePlanChange = (e) => {
    setSubscription(e.target.value);
    setShowPlanDropdown(false); 
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
    setShowPaymentDropdown(false); 
  };

  return (
    <>
      <div className='details-back'>
        <div className="form-container">
          <h2>Subscription Details</h2>
          <form>
            <div className="form-group">
              <label>Subscription Price</label>
              <input type="text" required />
            </div>
           
            <div className="form-group">
              <label>Subscription Plan</label>
              <div className="input-dropdown">
                <input
                  type="text"
                  value={subscription}
                  onClick={() => setShowPlanDropdown(!showPlanDropdown)}
                  onChange={(e) => setSubscription(e.target.value)}
                  required
                  placeholder="Select a plan"
                />
                {showPlanDropdown && (
                  <div className="dropdown-options">
                    <div className="dropdown-option" onClick={() => handlePlanChange({ target: { value: 'Individual' } })}>
                      Individual
                    </div>
                    <div className="dropdown-option" onClick={() => handlePlanChange({ target: { value: 'Budget' } })}>
                      Budget
                    </div>
                    <div className="dropdown-option" onClick={() => handlePlanChange({ target: { value: 'Elite' } })}>
                      Elite
                    </div>
                  </div>
                )}
              </div>
            </div>         
            <div className="form-group">
              <label>Payment Type</label>
              <div className="input-dropdown">
                <input
                  type="text"
                  value={payment}
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                  onChange={(e) => setPayment(e.target.value)}
                  required
                  placeholder="Select payment type"
                />
                {showPaymentDropdown && (
                  <div className="dropdown-options">
                    <div className="dropdown-option" onClick={() => handlePaymentChange({ target: { value: 'Google Pay' } })}>
                      Google Pay
                    </div>
                    <div className="dropdown-option" onClick={() => handlePaymentChange({ target: { value: 'Paytm' } })}>
                      Paytm
                    </div>
                    <div className="dropdown-option" onClick={() => handlePaymentChange({ target: { value: 'Card' } })}>
                      Card
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <button type="submit">Submit</button> 
              <Link to={'/Payment'}>
              <button style={{marginLeft:'15rem'}}> Checkout to Payment</button> </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDetails;







