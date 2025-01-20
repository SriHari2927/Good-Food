
// // import React from 'react';
// // import './IndividualPackBreakfast.css';
// // import { IoPartlySunnyOutline } from "react-icons/io5";
// // import idly from '../../../assets/idly.jpg'
// // import rice from '../../../assets/Rice.jpg'
// // import biriyani from '../../../assets/biriya.jpg'
// // import chappathi from '../../../assets/chappathi.jpg'
// // import pongal from '../../../assets/pongal.jpg'
// // import StarRatings from '../Home/StarRatings';
// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';


// // const IndividualPackBreakfast = () => {

// //   const [addedItems, setAddedItems] = useState({
// //     idly: false,
// //     pongal: false,
// //     rice: false,
// //     biriyani: false,
// //     chappathi: false,
// //   });


// //   const handleAddClick = (item) => {
// //     setAddedItems(prevState => ({
// //       ...prevState,
// //       [item]: !prevState[item], 
// //     }));
// //   };

// //   return (
// //     <> 
// //     <div className='backgrd'> 
// //     <Link to={'/user/Payment'}> 
// //   <div className='sub-add'> <button> SUBSCRIBE</button></div></Link>
// //     <div className='listt'>Choose your Subscription Plans </div>
// //     <br/><br/>
  
// //   <div className='days'> 
// //     <div> 1 Day - ₹75</div> 
// //     <div> 15 Days - ₹68 </div>
// //     <div> 30 Days - ₹60 </div>

// //   </div>

// //    <div className='break'> 
// //         <div className='breakfast-outt'> <IoPartlySunnyOutline/><span className='fastt'> Breakfast </span>Order before 11:00AM </div>         
// //   </div>

// //   <div className='photo'> 
// //   <div> 
// //     <div className='days-align'> Monday</div> <br/>
// //     <img src={idly} alt='idly'/><br/> 
// //     <h6> Idly+chutney+sambar <br/> <StarRatings/></h6>
// //     <div className='add'> 
// //     <button > Add </button> </div> 
// //   </div>
// //   <div> 
// //   <div className='days-align'> Tuesday</div> <br/>
// //     <img src={pongal} alt='dosa'/><br/> 
// //     <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
// //     <div className='add'> 
// //     <button> Add</button>  </div> 
// //   </div>
// //   <div> 
// //   <div className='days-align'> Wednesday</div> <br/>
// //     <img src={rice} alt='idly'/><br/> 
// //     <h6> Rice + Chicken gravy <br/>  <StarRatings/></h6>
// //     <div className='add'> 
// //    <button  > Add </button> </div> 
// //   </div>
// //   <div> 
// //   <div className='days-align'> Thursday</div> <br/>
// //     <img src={biriyani} alt='dosa'/><br/> 
// //     <h6> Chicken Biriyani <br/>  <StarRatings/></h6>
// //     <div className='add'> 
// //     <button> Add</button>  </div> 
// //   </div>
// //   <div> 
// //   <div className='days-align'> Friday</div> <br/>
// //     <img src={pongal} alt='dosa'/><br/> 
// //     <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
// //     <div className='add'> 
// //     <button> Add</button>  </div> 
// //   </div>
// //   <div> 
// //   <div className='days-align'> Saturday</div> <br/>
// //     <img src={rice} alt='idly'/><br/> 
// //     <h6>Rice + Chicken gravy <br/>  <StarRatings/></h6>
// //     <div className='add'> 
// //    <button  > Add </button> </div> 
// //   </div>

// //   <div> 
// //   <div className='days-align'> Sunday</div> <br/>
// //     <img src={chappathi} alt='idly'/><br/> 
// //     <h6> Chappathi  <br/>  <StarRatings /></h6>
// //     <div className='add'> 
// //     <button onClick={() => handleAddClick('chappathi')}> 
// //               {addedItems.chappathi ? 'Added' : 'Add'} 
// //               {addedItems.chappathi && '+'} 
// //             </button>
// //      </div> 
// //     </div>
// //     </div> 
// //     </div>
// //     </>
// //   )
// // }

// // export default IndividualPackBreakfast





import React, { useState,useEffect } from 'react';
import './IndividualPackBreakfast.css';
import { IoPartlySunnyOutline } from "react-icons/io5";
import idly from '../../../assets/idly.jpg';
import rice from '../../../assets/Rice.jpg';
import biriyani from '../../../assets/biriya.jpg';
import chappathi from '../../../assets/chappathi.jpg';
import pongal from '../../../assets/pongal.jpg';
import StarRatings from '../Home/StarRatings';
import { Link } from 'react-router-dom';
import axios from 'axios';


const IndividualPackBreakfast = () => {
 
  const [plans, setPlans] = useState([]);
  const [addedItems, setAddedItems] = useState({}); 
  const [selectedDay, setSelectedDay] = useState('');

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const plansData = response.data.groupedSubscriptions?.['Individual Budget']?.Breakfast || [];
        setPlans(plansData);
        setLoading(false); 
        console.log("Response : " , response.data)
      } catch (error) {
        console.error('Error fetching subscription plans:', error.response?.data || error.message);
        setPlans([]);
        setLoading(false); 
      }
    };

    fetchPlans();
  }, []);









  const handleQuantityChange = (item, operation) => {
    setAddedItems(prevState => {
      const newQuantity = operation === 'increment' 
        ? prevState[item] + 1 
        : (prevState[item] > 0 ? prevState[item] - 1 : 0);
      return { ...prevState, [item]: newQuantity };
    });
  };
 
  const handleDayClick = (day) => {
    setSelectedDay(prevSelectedDay => (prevSelectedDay === day ? '' : day));
  };

  return (
    <> 
      <div className='backgrd'> 
        <Link to={'/user/Payment'}> 
          <div className='sub-add'>
            <button>SUBSCRIBE</button>
          </div>
        </Link>
        <div className='listt'>Choose your Subscription Plans</div>
        <br/><br/>

        

        <div className='days' onClick={() => handleDayClick()} >
          {loading ? (
            <div>Loading plans...</div>
          ) : (
            plans.length > 0 ? (
              plans.map((plan, index) => (
                <div key={index} className="plan-card">
                  {plan.days} Day = ₹{plan.price}
                </div>
              ))
            ) : (
              <div>No plans available</div>
            )
          )}
          
        </div>

        <div className='break'> 
          <div className='breakfast-outt'>
            <IoPartlySunnyOutline />
            <span className='fastt'> Breakfast </span>Order before 11:00AM
          </div>
        </div>

        <div className='photo'>
          {[{ name: 'idly', image: idly, description: 'Idly+chutney+sambar', day: 'Monday' },
            { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Tuesday' },
            { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Wednesday' },
            { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani', day: 'Thursday' },
            { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Friday' },
            { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Saturday' },
            { name: 'chappathi', image: chappathi, description: 'Chappathi', day: 'Sunday' }
          ].map((item) => (
            <div key={item.name}>
              <div className='days-align'>{item.day}</div>
              <br />
              <img src={item.image} alt={item.name} />
              <br />
              <h6>{item.description} <br /><StarRatings /></h6>
              <div className='add'>
                {addedItems[item.name] > 0 ? (
                  <div className="quantity-container">
                    <button onClick={() => handleQuantityChange(item.name, 'decrement')}>-</button>
                    <span>{addedItems[item.name]}</span>
                    <button onClick={() => handleQuantityChange(item.name, 'increment')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => handleQuantityChange(item.name, 'increment')}>
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndividualPackBreakfast;


// import React, { useState } from 'react';
// import './IndividualPackBreakfast.css';
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg';
// import rice from '../../../assets/Rice.jpg';
// import biriyani from '../../../assets/biriya.jpg';
// import chappathi from '../../../assets/chappathi.jpg';
// import pongal from '../../../assets/pongal.jpg';
// import StarRatings from '../Home/StarRatings';
// import { Link } from 'react-router-dom';
 
// const IndividualPackBreakfast = () => {
//   const [addedItems, setAddedItems] = useState({
//     idly: 0,
//     pongal: 0,
//     rice: 0,
//     biriyani: 0,
//     chappathi: 0,
//   });
 
//   const [selectedDay, setSelectedDay] = useState('');
 
//   const handleDayClick = (day) => {
//     setSelectedDay(prevSelectedDay => (prevSelectedDay === day ? '' : day));
//   };
 
//   const handleQuantityChange = (item, operation) => {
//     setAddedItems(prevState => {
//       const newQuantity = operation === 'increment'
//         ? prevState[item] + 1
//         : (prevState[item] > 0 ? prevState[item] - 1 : 0);
//       return { ...prevState, [item]: newQuantity };
//     });
//   };
 
//   return (
//     <>
//       <div className='backgrd'>
//         <Link to={'/user/Payment'}>
//           <div className='sub-add'>
//             <button>SUBSCRIBE</button>
//           </div>
//         </Link>
//         <div className='listt'>Choose your Subscription Plans</div>
//         <br/><br/>
 
       
//         <div className='days'>
//           {['1 Day - ₹75', '15 Days - ₹68', '30 Days - ₹60'].map((day, index) => (
//             <div
//               key={index}
//               className={`day-item ${selectedDay === day ? 'selected' : ''}`}
//               onClick={() => handleDayClick(day)}
//             >
//               {day}
//             </div>
//           ))}
//         </div>
 
//         <div className='break'>
//           <div className='breakfast-outt'>
//             <IoPartlySunnyOutline />
//             <span className='fastt'> Breakfast </span>Order before 11:00AM
//           </div>
//         </div>
 
//         <div className='photo'>
//           {[{ name: 'idly', image: idly, description: 'Idly+chutney+sambar', day: 'Monday' },
//             { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Tuesday' },
//             { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Wednesday' },
//             { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani', day: 'Thursday' },
//             { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Friday' },
//             { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Saturday' },
//             { name: 'chappathi', image: chappathi, description: 'Chappathi', day: 'Sunday' }
//           ].map((item) => (
//             <div key={item.name}>
//               <div className='days-align'>{item.day}</div>
//               <br />
//               <img src={item.image} alt={item.name} />
//               <br />
//               <h6>{item.description} <br /><StarRatings /></h6>
//               <div className='add'>
//                 {addedItems[item.name] > 0 ? (
//                   <div className="quantity-container">
//                     <button onClick={() => handleQuantityChange(item.name, 'decrement')}>-</button>
//                     <span>{addedItems[item.name]}</span>
//                     <button onClick={() => handleQuantityChange(item.name, 'increment')}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleQuantityChange(item.name, 'increment')}>
//                     Add
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
 
// export default IndividualPackBreakfast;