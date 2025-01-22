import React from 'react'
import './FeedItemsOption.css'
import { useState } from 'react';

const FeedItemsOption = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);   
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };

  return (
    <> 

    <div className='feedItems-headers'> 
    
    <button onClick={togglePopup}>Add Plan </button>
    <button onClick={togglePopup}>Add Tier</button>
    <button onClick={togglePopup}>Add Day </button>
    <button onClick={togglePopup}>Add Quantity </button>
    <button onClick={togglePopup}>Add Price </button>
    <button onClick={togglePopup}>Add Meal Type</button>
    </div>
    <div className="feed-header">

    {isPopupOpen && (
        <div className="feed-popup">
          <div className="feed-popup-content">
            <button onClick={togglePopup}>X</button>
            <div className='feeditems-plan'> 
            <label> Name </label> <span style={{marginLeft:'1rem'}}> </span> 
            <input/>                     
</div> 
          </div>
        </div>
      )}
</div>
    </>
  )
}

export default FeedItemsOption