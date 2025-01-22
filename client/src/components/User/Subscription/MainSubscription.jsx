
import React, { useState } from 'react';
import './MainSubscription.css';
import { Link, useNavigate } from 'react-router-dom';

const MainSubscription = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIndividual = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleCost =()=>{
    navigate('/user/individualPackBreakfast')
  }

  const handleCostLunch =()=>{
    navigate('/user/individualPackLunch')
  }

  const handleCostDinner =()=>{
    navigate('/user/individualPackDinner')
  }


  return (
    <>
      <div className="back">
        <h1 className="heading"> Choose Your Plan for Subscription!</h1>
        <div className="choose-plan">
          <h2 className="combo">
            Individual Pack <br />
            <button onClick={handleIndividual}>View</button>
          </h2>

          <h2 className="comboo">
            Combo Budget Plan <br />
            <Link to="/user/IndividualPack">
              <button>View</button>
            </Link>
          </h2>
          <h2 className="combooo">
            Combo Elite Plan <br />
            <Link to="/user/IndividualPack">
              <button>View</button>
            </Link>
          </h2>
        </div>
      </div>
  
      {/* {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btnn" onClick={closeModal}>X</button>
     
            <table className="styled--table">
              <thead>
                <tr>
                  <th colSpan={2}> Breakfast</th> 
                  <th colSpan={2}> Lunch</th>
                  <th colSpan={2}> Dinner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCost}> Budget <br/> ₹200  </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCost}> Elite <br/>  ₹300  </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostLunch}> Budget <br/>  ₹200  </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostLunch}> Elite <br/>  ₹300  </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostDinner}> Budget <br/>  ₹200  </button>
                  </td>
                  <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
                    <button onClick={handleCostDinner}> Elite <br/>  ₹300  </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </>
  );
};

export default MainSubscription;
