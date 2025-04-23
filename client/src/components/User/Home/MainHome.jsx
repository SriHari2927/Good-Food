// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./MainHome.css";
// import { IoMdLogOut } from "react-icons/io";
// import { useSidebar } from "../../Sidebar/SidebarContext";

// const MainHome = () => {
//   const { isOpen } = useSidebar();

//   const [additionalItems, setAdditionalItems] = useState([]);

//   useEffect(() => {
//     const fetchAdditionalItems = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("Additional Items:",response.data)
//         setAdditionalItems(response.data.foodItems);
//       } catch (error) {
//         console.error("Error fetching additional items:", error);
//       }
//     };

//     fetchAdditionalItems();
//   }, []);

//   return (
//     <div className={`main-content ${isOpen ? "shifted" : ""}`}>
//       <button className="logout">
//         <IoMdLogOut /> Logoutttttt
//       </button>

// <div className="weekly-menu">

//        {/* Display Additional Items */}
//         <div className="additional-items">
//           <h2>Additional Items</h2>
//           {additionalItems.length > 0 ? (
//             <div className="food-items-container">
//               {additionalItems.map((item, index) => (
//                 <div key={index} className="food-item">
//                   <img
//                     src={item.image_url || "/placeholder.jpg"}
//                     alt={item.name}
//                     className="food-image"
//                   />
//                   <span>{item.name}</span>
//                   <span>Price: ₹{item.price}</span>

// <div className="food-item-actions">
//   <button> Add </button>
//                   </div>

//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No additional items available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainHome;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MainHome.css";
import { IoMdLogOut } from "react-icons/io";
import { useSidebar } from "../../Sidebar/SidebarContext";

const MainHome = () => {
  const { isOpen } = useSidebar();
  const [userMenus, setUserMenus] = useState([]);
  const [additionalItems, setAdditionalItems] = useState([]);

  useEffect(() => {
    const fetchMenusAndItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const [menuRes, extraRes] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/dailyPeriod/userMenu`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setUserMenus(menuRes.data.dailyMenus || []);
        setAdditionalItems(extraRes.data.foodItems || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMenusAndItems();
  }, []);

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <button className="logout">
        <IoMdLogOut /> Logout
      </button>

      <div className="weekly-menu">
        <div className="user-menu-section">
          <h2>Your Daily Menu</h2>
          {userMenus.length > 0 ? (
            userMenus.map((menu, index) => {
              const foodItems = Array.isArray(menu.subFoodMenuu?.FoodItems)
                ? menu.subFoodMenuu.FoodItems
                : [menu.subFoodMenuu?.FoodItems].filter(Boolean);

              return (
                <div key={index} className="food-items-container">
                  {foodItems.map((item, idx) => (
                    <div key={idx} className="food-item">
                      <img
                        src={item?.image_url || "/placeholder.jpg"}
                        alt={item?.item_name || "Food Item"}
                        className="food-image"
                      />
                      <span>{item?.item_name}</span>
                      <div className="food-item-actions">
                        <button>Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <p>No daily menu available.</p>
          )}
        </div>

        <div className="additional-items">
          <h2>Additional Items</h2>
          {additionalItems.length > 0 ? (
            <div className="food-items-container">
              {additionalItems.map((item, index) => (
                <div key={index} className="food-item">
                  <img
                    src={item.image_url || "/placeholder.jpg"}
                    alt={item.name}
                    className="food-image"
                  />
                  <span>{item.name}</span>
                  <span>Price: ₹{item.price}</span>
                  <div className="food-item-actions">
                    <button>Add</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No additional items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHome;


