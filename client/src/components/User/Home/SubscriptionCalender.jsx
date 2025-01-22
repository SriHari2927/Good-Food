import React from 'react';
import './SubscriptionCalender.css';
import Checkbox from '@mui/material/Checkbox'; 
import { pink } from '@mui/material/colors';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SubscriptionCalender = () => {
  return (
    <>
      <div className="order-header">Subscription Details</div>
      <div className='sub-status'> 
      <div> <Checkbox {...label} defaultChecked /> Pending  </div>
      <div> <Checkbox {...label} /> Cancelled  </div>
      <div> <Checkbox
        {...label}
        defaultChecked
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      /> Delivered  </div> </div>
      <br/> 
      
      <div> 
        <table className='styled-table'> 
          <tr> 
            <th> Date </th>
            <th> Breakfast </th>
            <th> Lunch </th>
            <th> Dinner </th>  
          </tr>
          <tr> 
            <td> 1-2-2024 </td>
            <td>  <Checkbox {...label} defaultChecked />  </td>
            <td>  <Checkbox {...label} defaultChecked />  </td>
            <td>  <Checkbox {...label} defaultChecked /> </td>           
          </tr>
        </table>
      </div>
    </>
  );
};

export default SubscriptionCalender;
