import React from 'react'
import './Payment.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';


const Payment = () => {

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const handlePayment = () => {

    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 240000 );


  };

  return (
    <>

<div className='details-back'>
        <div className="form-container">
          <h2>Subscription Details</h2><br/>
 <form>
        <div className="subscription-details">
  <div className="form-group">
    <label>Subscription Plan:</label>
    <span>Combo Budget</span>
  </div>

  <div className="form-group">
    <label>Subscription Price:</label>
    <span>₹200</span>
  </div>

  <div className="form-group">
    <label>Subscription Days:</label>
    <span>30 Days</span>
  </div>

  <div className="form-group">
    <label>Starting Date:</label>
    <span>01-12-2024</span>
  </div>

  <div className="form-group">
    <label>Ending Date:</label>
    <span>01-01-2025</span>
  </div>

  <div className="form-group">
    <label>Subscription Validity:</label>
    <span>45 Days</span>
  </div>
</div>
            <br/><br/>
      

 <div className="subscription-details">                            
<div className="payment-method">
          <div>Select Payment Method</div>
        </div>        
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group">
        <FormControlLabel value="fGoogle Pay" control={<Radio />}  label="Google Pay" sx={{ color: 'black' }} />
        <FormControlLabel value="Phone Pay" control={<Radio />} label="Phone Pay" sx={{ color: 'black' }} />
        <FormControlLabel value="Card" control={<Radio />} label="Card" sx={{ color: 'black' }} />
      </RadioGroup>
    </FormControl>
    </div>   
            <div className="form-group">              
              <Link to={'/user/Home'}>
              <button onClick={handlePayment} className='c-t-pay' > Checkout to Payment</button> </Link>  
            </div>
            {paymentSuccess && (
              <Alert severity="success">Payment Success!</Alert>
            )}
            
          </form>
          
        </div>
      </div>
    </>
  )
}

export default Payment


