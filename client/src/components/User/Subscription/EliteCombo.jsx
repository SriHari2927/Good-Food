import React, {  useEffect, useState } from 'react';
import './IndividualPack.css';
import { IoSunnyOutline, IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";
import idly from '../../../assets/idly.jpg';
import rice from '../../../assets/Rice.jpg';
import biriyani from '../../../assets/biriya.jpg';
import chappathi from '../../../assets/chappathi.jpg';
import pongal from '../../../assets/pongal.jpg';
import StarRatings from '../Home/StarRatings';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const EliteCombo = () => {
 
  const [addedItems, setAddedItems] = useState({}); 
  const [error, setError] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const plansData = response.data.groupedSubscriptions?.['Combo Elite']?.Combo || [];
        setPlans(plansData);
        setLoading(false);
        console.log('Fetched Plans:', plansData);
      } catch (error) {
        console.error('Error fetching subscription plans:', error.response?.data || error.message);
        setPlans([]);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

 
  const handlePlanClick =  async (subscription_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/createUserSubscription`,
        { subscription_id }, 

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

        console.log("Subscription Created:", response.data);
        alert("Subscription successfully created.");
        navigate("/user/Payment"); 
    } catch (err) {
      console.error("Error creating subscription");
      setError("Failed to create subscription. Please try again.");
    }


      
    
  };

 
  const handleAddClick = (item) => {
    setAddedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };
 

  return (
    <>
  <div className="backgrd">
      <div className="listt">Choose your Subscription Plans</div>
      <button >Subscribe</button>
      {error && <div className="error">{error}</div>}

      <div className='days'>
      {loading ? (
          <div>Loading...</div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="plan-item"
              onClick={() => handlePlanClick(plan.id)} 
            >
              <div>{plan.days} Days - ₹{plan.price}</div>
            </div>
          ))
        )}
      </div>



  <div className='break'> 
            <div className='breakfast-outt'> <IoPartlySunnyOutline/><span className='fastt'> Breakfast </span>Order before 11:00AM </div>         
  </div>

  <div className='photo'> 
  <div> 
    <div className='days-align'> Monday</div> <br/>
    <img src={idly} alt='idly'/><br/> 
    <h6> Idly+chutney+sambar <br/> <StarRatings/></h6>
    <div className='add'> 
    <button > Add </button> </div> 
  </div>
  <div> 
  <div className='days-align'> Tuesday</div> <br/>
    <img src={pongal} alt='dosa'/><br/> 
    <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
  <div className='days-align'> Wednesday</div> <br/>
    <img src={rice} alt='idly'/><br/> 
    <h6> Rice + Chicken gravy <br/>  <StarRatings/></h6>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>
  <div> 
  <div className='days-align'> Thursday</div> <br/>
    <img src={biriyani} alt='dosa'/><br/> 
    <h6> Chicken Biriyani <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
  <div className='days-align'> Friday</div> <br/>
    <img src={pongal} alt='dosa'/><br/> 
    <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
  <div className='days-align'> Saturday</div> <br/>
    <img src={rice} alt='idly'/><br/> 
    <h6>Rice + Chicken gravy <br/>  <StarRatings/></h6>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>

  <div> 
  <div className='days-align'> Sunday</div> <br/>
    <img src={chappathi} alt='idly'/><br/> 
    <h6> Chappathi  <br/>  <StarRatings /></h6>
    <div className='add'> 
    <button onClick={() => handleAddClick('chappathi')}> 
              {addedItems.chappathi ? 'Added' : 'Add'} 
              {addedItems.chappathi && '+'} 
            </button>
     </div> 
    </div>
    </div>

  <div className='break'> 
               <div className='breakfast-outt'> <IoSunnyOutline /><span className='fastt'> Lunch </span>   Order before 3:00AM  </div>
            
  </div>

  <div className='photo'> 
  <div> 
    <img src={idly} alt='idly'/><br/> 
    <h6> Idly+chutney+sambar <br/> <StarRatings/></h6>
    <div className='add'> 
    <button > Add </button> </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h6> Rice + Chicken gravy <br/>  <StarRatings/></h6>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>
  <div> 
    <img src={biriyani} alt='dosa'/><br/> 
    <h6> Chicken Biriyani <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h6>Rice + Chicken gravy <br/>  <StarRatings/></h6>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>

  <div> 
    <img src={chappathi} alt='idly'/><br/> 
    <h6> Chappathi  <br/>  <StarRatings /></h6>
    <div className='add'> 
    <button onClick={() => handleAddClick('chappathi')}> 
              {addedItems.chappathi ? 'Added' : 'Add'} 
              {addedItems.chappathi && '+'} 
            </button>
     </div> 
    </div>
    </div>

  <div className='break'> 
     <div className='breakfast-outt'>  <MdOutlineModeNight /> <span className='fastt'> Dinner </span> Order before 7:00PM </div> 
  </div>
  <div className='photo'> 
  <div> 
    <img src={idly} alt='idly'/><br/> 
    <h6> Idly+chutney+sambar <br/> <StarRatings/></h6>
    <div className='add'> 
    <button > Add </button> </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h6> Rice + Chicken gravy <br/>  <StarRatings/></h6>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>
  <div> 
    <img src={biriyani} alt='dosa'/><br/> 
    <h6> Chicken Biriyani <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={pongal} alt='dosa'/><br/> 
    <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
    <div className='add'> 
    <button> Add</button>  </div> 
  </div>
  <div> 
    <img src={rice} alt='idly'/><br/> 
    <h6>Rice + Chicken gravy <br/>  <StarRatings/></h6>
    <div className='add'> 
   <button  > Add </button> </div> 
  </div>

  <div> 
    <img src={chappathi} alt='idly'/><br/> 
    <h6> Chappathi  <br/>  <StarRatings /></h6>
    <div className='add'> 
    <button onClick={() => handleAddClick('chappathi')}> 
              {addedItems.chappathi ? 'Added' : 'Add'} 
              {addedItems.chappathi && '+'} 
            </button>
     </div> 
    </div>
    </div>

    </div>

    </>
  )
}

export default EliteCombo



