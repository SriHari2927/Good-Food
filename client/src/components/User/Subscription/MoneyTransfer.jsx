import React from 'react'
import './MoneyTransfer.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';

const MoneyTransfer = () => {
  return (
    <>
    <div className='paymentpage'> 
     <div className="subscription-detailss">                            
<div className="payment-method">
          <div style={{fontSize:'1.5rem'}}>Select Payment Method</div>
        </div>   
        <br/>     
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group">
        <FormControlLabel value="fGoogle Pay" control={<Radio />}  label="Google Pay" sx={{ color: 'black' }} />
        <FormControlLabel value="Phone Pay" control={<Radio />} label="Phone Pay" sx={{ color: 'black' }} />
         <FormControlLabel value="Card" control={<Radio />} label="Card" sx={{ color: 'black' }} />
<Link to={'/user/Home'}> 
<div className='paycash'> 
        <button> Pay </button>
        </div>
        </Link>
      </RadioGroup>
    </FormControl>  
    </div> 
    </div>
   
    </>
  )
}

export default MoneyTransfer