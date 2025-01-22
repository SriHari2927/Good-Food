// import React,{useState} from 'react'
// import './IdeasToImprove.css'

// const IdeasToImprove = () => {

//     const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

//     const closeFeedbackForm = () => {
//         setIsFeedbackVisible(false);
//       };


//   return (
//     <> 
//     <div>IdeasToImprove</div>

//     {isFeedbackVisible && (
//         <div className='mmodal'>
//           <div className='mmodal-content'>
//             <button className="cclose-btn" onClick={closeFeedbackForm}>X</button>
//             <div className='feedback-head'>
//               <h2 style={{ color: 'orangered' }}>Give Us Feedback to Improve!</h2>
//               <div><h3>Name <input type='text' /></h3></div>
//               <div><h3>Mobile Number <input type='number' /></h3></div>
//               <div><h3>Email id <input type='text' /></h3></div>
//               <div><h3>Comments <textarea /></h3></div>
//               <button className='feedback-submit'>Submit</button>
//             </div>
//           </div>
//         </div>
//       )}  
//     </>
//   )
// }

// export default IdeasToImprove






import React, { useState } from 'react';
import './IdeasToImprove.css'; 

const IdeasToImprove = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className='mmodal'>
      <div className='mmodal-content'>
        <button className="cclose-btn" onClick={onClose}>X</button>
        <div className='feedback-head'>
          <h4 style={{ color: 'orangered', marginTop:'1.7rem', display:'flex', justifyContent:'center' }}>Give Us Feedback to Improve!</h4>
          <br/>
          <div><h5>Name <input type='text' /></h5></div>
          <div><h5>Mobile Number <input type='number' /></h5></div>
          <div><h5>Email id <input type='text' /></h5></div>
          <div><h5>Comments <textarea /></h5></div>
          <button className='feedback-submit'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default IdeasToImprove;
