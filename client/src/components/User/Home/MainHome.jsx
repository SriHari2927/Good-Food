import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MainHome.css';
import MainNavbar from '../Navbar/MainNavbar';
 
const MainHome = () => {
  const [menu, setMenu] = useState({});
  const [additionalItems, setAdditionalItems] = useState([]);
 
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/dailyPeriod/All`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
 
        console.log('Formatted Menu:', response.data.formattedMenu);
        setMenu(response.data.formattedMenu || {});
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
 
    fetchMenu();
  }, []);
 
  useEffect(() => {
    const fetchAdditionalItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdditionalItems(response.data.foodItems);
      } catch (error) {
        console.error('Error fetching additional items:', error);
      }
    };
 
    fetchAdditionalItems();
  }, []);
 
  const handleAddToOrder = async (meal_type_id, parent_plan_id, food_name) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/orders/checkOrderTiming`,
        { meal_type_id, parent_plan_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      if (response.data.isOrderAllowed) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find((item) => item.meal_type_id === meal_type_id);
 
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.push({
            meal_type_id,
            parent_plan_id,
            name: food_name,
            price: 50,
            quantity: 1,
          });
        }
 
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Meal added to cart!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };
 
  return (
    <>
      <MainNavbar />
      <div className="menu-container">
        <h2>Menu</h2>
 
        {Object.entries(menu).map(([day, meals]) => (
          <div key={day} className="day-section">
            <h3>{day}</h3>
           
            {Object.entries(meals).map(([mealType, foods]) => (
              <div key={mealType} className="meal-section">
                <h4>{mealType}</h4>
                <ul className="food-list">
                  {foods.map((food, index) => (
                    <li key={index} className="food-item">
                      <img
                        src={food.image || '/placeholder.jpg'}
                        alt={food.food_name}
                        className="food-image"
                      />
                      <span>{food.food_name}</span>
                      <button
                        onClick={() =>
                          handleAddToOrder(food.meal_type_id, food.parent_plan_id, food.food_name)
                        }
                      >
                        +
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
 
        <div className="choose-menu">Choose more Delicious Foods</div>
 
        <div className="additional-items">
          <h2>Additional Items</h2>
          {additionalItems.length > 0 ? (
            <div className="food-items-container">
              {additionalItems.map((item, index) => (
                <div key={index} className="food-item">
                  <img
                    src={item.image_url || '/placeholder.jpg'}
                    alt={item.name}
                    className="food-image"
                  />
                  <span>{item.name}</span>
                  <div className="food-item-actions">
                    <button>-</button>
                    <button>+</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No additional items available.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default MainHome;