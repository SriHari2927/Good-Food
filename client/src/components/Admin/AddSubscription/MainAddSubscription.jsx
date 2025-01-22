
// import React, { useState } from 'react'
// import './MainAddSubscription.css'
// import { Link } from 'react-router-dom'
// import MainSidebar from '../AdminSidebar/MainSidebar';

// const MainAddSubscription = () => {
  
//   const [isFormVisible, setFormVisible] = useState(false);
//   const toggleFormVisibility = () => {
//     setFormVisible(!isFormVisible);
//   };

//   const handleSaveNext= ()=>{
//     alert(' Subscription Plan Saved Successfully!')
//   }

//   return (
//     <>
//     <div> <MainSidebar/> </div>
//       <div className='sub-plan'> Subscription Plans</div> 
//       <div className='add--button'>
//         <button onClick={toggleFormVisibility}> Add Plan </button>
//       </div>     
//       {isFormVisible && (
//         <div className='back--admin'>      
//           <div className='plan-style'> 
// <div className='pop-break'> 
// <label> Plan Name <input/></label> 
// <label> Number of Days <input/></label> 
// <label> Number of Days Validity <input/></label> 
// <label> Price <input/></label> 
// <label> Breakfast Quantity <input/></label> 
// <label> Lunch Quantity <input/></label> 
// <label> Dinner Quantity <input/></label> 
// </div>

// </div>
// <div className='admin--submit'>
//             <button onClick={handleSaveNext}> Save</button>
//             <Link to={'/admin/addmenuitems'}>
//               <button> Next </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default MainAddSubscription;









import React, { useState } from 'react';
import './MainAddSubscription.css';
import { Link } from 'react-router-dom';
import MainSidebar from '../AdminSidebar/MainSidebar';
import MainFeedItems from '../FeedItems/MainFeedItems';

const MainAddSubscription = () => {
  const [isFormVisible, setFormVisible] = useState(false);

 
  const [formData, setFormData] = useState({
    planName: '',
    numberOfDays: '',
    numberOfDaysValidity: '',
    price: '',
    breakfastQuantity: '',
    lunchQuantity: '',
    dinnerQuantity: '',
  });

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveNext = () => {
    console.log('Form Data:', formData); 
    alert('Subscription Plan Saved Successfully!');
  
  };

  return (
    <>
        <MainSidebar />
        <MainFeedItems/>      
      <div className="sub-plan">Subscription Plans</div>  
      <div className="add--button">
        <button onClick={toggleFormVisibility}>Add Plan</button>
      </div>
      {isFormVisible && (
        <div className="back--admin">
          <div className="plan-style">
            <div className="pop-break">
              <label>
                Plan Name
                <input
                  name="planName"
                  value={formData.planName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Number of Days
                <input
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Number of Days Validity
                <input
                  name="numberOfDaysValidity"
                  value={formData.numberOfDaysValidity}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Price
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Breakfast Quantity
                <input
                  name="breakfastQuantity"
                  value={formData.breakfastQuantity}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Lunch Quantity
                <input
                  name="lunchQuantity"
                  value={formData.lunchQuantity}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Dinner Quantity
                <input
                  name="dinnerQuantity"
                  value={formData.dinnerQuantity}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="admin--submit">
            <button onClick={handleSaveNext}>Save</button>
            <Link to={'/admin/addmenuitems'}>
              <button>Next</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAddSubscription;
