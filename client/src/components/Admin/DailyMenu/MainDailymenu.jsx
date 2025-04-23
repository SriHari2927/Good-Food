// import React from 'react'
// import './MainDailymenu.css'

// const MainDailymenu = () => {
//   return (
//     <>

//     <h2> Daily Food Items </h2>
//     <br/>
//     <div className='day-position'>
//       <div className='day-dropdown'>
//         Select type
//         <select>
//           <option>Daily</option>
//           <option>Weekly</option>
//           <option>Monthly</option>
//         </select>
//       </div>
//     <div className='day-dropdown'>
//   Select Day
//   <select>
//     <option value="monday">Monday</option>
//     <option value="tuesday">Tuesday</option>
//     <option value="wednesday">Wednesday</option>
//     <option value="thursday">Thursday</option>
//     <option value="friday">Friday</option>
//     <option value="saturday">Saturday</option>
//     <option value="sunday">Sunday</option>
//   </select>
// </div>
// <div className='day-dropdown'>
//   Select Catagory
//   <select>
//     <option> Dosa </option>
//     <option> Poori</option>
//     <option> Idly</option>
//     <option> Chappathi </option>
//   </select>
// </div >
// <div className='day-dropdown'>
//   Select Meal Type
//   <select>
//     <option> BreakFast </option>
//     <option> Lunch </option>
//     <option> Dinner </option>
//   </select>
// </div >
// <div className='day-save'>
// <label style={{textAlign:'center', fontWeight:'bold', fontSize:'1.3rem'}}> Save </label>
// </div>

// </div>

//     </>
//   )
// }

// export default MainDailymenu



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./MainDailymenu.css";

// const MainDailymenu = () => {
//   const [periods, setPeriods] = useState([]);
//   const [foodItems, setFoodItems] = useState({});
//   const [plans, setPlans] = useState([]);

//   const [selectedPeriod, setSelectedPeriod] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [selectedMealType, setSelectedMealType] = useState("");
//   const [selectedFoodItem, setSelectedFoodItem] = useState(""); 
//   const [selectedFoodItems, setSelectedFoodItems] = useState({}); 
//   const [createdMenus, setCreatedMenus] = useState([]);
  

//   const backendURL = process.env.REACT_APP_BACKEND_SERVER_URL;
//   const authHeader = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };

//   const isComboPlan = plans.find(
//     (plan) =>
//       plan.id === Number(selectedPlan) &&
//       plan.name.toLowerCase().includes("combo")
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [periodRes, foodRes, planRes] = await Promise.all([
//           axios.get(`${backendURL}/dailyPeriod/getPeriod`, authHeader),
//           axios.get(`${backendURL}/foodMenu/getMenu`, authHeader),
//           axios.get(`${backendURL}/parentPlan/getPlan`, authHeader),
//         ]);

//         const formattedPeriods = Array.isArray(periodRes.data.getDays)
//           ? periodRes.data.getDays.map((item) => ({
//               id: item.id,
//               name: item.period,
//             }))
//           : [];

//         const grouped = foodRes.data.groupedMenu || {};

//         const formattedPlans = Array.isArray(planRes.data.parentPlans)
//           ? planRes.data.parentPlans.map((plan) => ({
//               id: plan.id,
//               name: plan.plan_name,
//             }))
//           : [];

//         setPeriods(formattedPeriods);
//         setFoodItems(grouped);
//         setPlans(formattedPlans);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       }
//     };

//     fetchData();
//   }, [backendURL]);

//   useEffect(() => {
//     if (plans.length === 0 || periods.length === 0) return;
  
//     const fetchDailyMenus = async () => {
//       try {
//         const res = await axios.get(`${backendURL}/dailyPeriod/getDaily`, authHeader);
//         const dailyMenus = res.data.fetchDailyMenu;
  
//         const formattedMenus = dailyMenus.map((menu) => ({
//           id: menu.id,
//           planName: plans.find((p) => p.id === menu.parent_plan_id)?.name || `Plan ${menu.parent_plan_id}`,
//           period: periods.find((p) => p.id === menu.period)?.name || `Period ${menu.period}`,
//           foodItems: Object.entries(menu.groupedItems || {}).map(([mealType, items]) => ({
//             mealType,
//             items,
//           })),
//         }));
  
//         setCreatedMenus((prev) => [...formattedMenus, ...prev]);
//       } catch (error) {
//         console.error("Error fetching daily menus:", error);
//       }
//     };
  
//     fetchDailyMenus();
//   }, [plans, periods, backendURL]);
  

//   const toggleFoodSelection = (mealType, foodId) => {
//     setSelectedFoodItems((prev) => {
//       const current = prev[mealType] || [];
//       const exists = current.includes(foodId);

//       return {
//         ...prev,
//         [mealType]: exists
//           ? current.filter((id) => id !== foodId)
//           : [...current, foodId],
//       };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedPlan || !selectedPeriod) {
//       alert("Please select both Plan and Period");
//       return;
//     }
  
//     const data = {
//       parent_plan_id: Number(selectedPlan),
//       period: Number(selectedPeriod),
//       subscription_food_menu_ids: isComboPlan
//         ? Object.values(selectedFoodItems).flat()
//         : [Number(selectedFoodItem)],
//     };
  
//     if (!data.subscription_food_menu_ids.length) {
//       alert("Please select at least one food item.");
//       return;
//     }
  
//     try {
//       const res = await axios.post(
//         `${backendURL}/dailyPeriod/createDaily`,
//         data,
//         authHeader
//       );
  
//       alert("Success");
//       const planName = plans.find((p) => p.id === Number(selectedPlan))?.name;
//       const newMenus = res.data.createdMenus.map((menu) => ({
//         id: menu.id,
//         planName,
//         period: periods.find((p) => p.id === Number(selectedPeriod))?.name,
//         foodItems: isComboPlan
//           ? Object.entries(selectedFoodItems).map(([mealType, ids]) => ({
//               mealType,
//               items: foodItems[mealType].filter((f) => ids.includes(f.subscription_food_menu_id)),
//             }))
//           : [{
//               mealType: selectedMealType,
//               items: foodItems[selectedMealType]?.filter(
//                 (f) => f.subscription_food_menu_id === Number(selectedFoodItem)
//               ),
//             }],
//       }));
  
//       setCreatedMenus((prev) => [...prev, ...newMenus]);
  
//       setSelectedPeriod("");
//       setSelectedPlan("");
//       setSelectedMealType("");
//       setSelectedFoodItem("");
//       setSelectedFoodItems({});
//     } catch (error) {
//       alert("Failed!!");
//       console.error("Error creating daily menu:", error);
//     }
//   };
 
//   const handleSetActive = async (menuId) => {
//     try {
//       await axios.post(`${backendURL}/dailyPeriod/setActive`, {
//         menu_id: menuId,
//         parent_plan_id: selectedPlan,
//         period: selectedPeriod,
//       }, authHeader);
  
//       alert("Set as active");
//     } catch (error) {
//       console.error("Failed to activate menu:", error);
//     }
//   };
  
//   const handleDelete = async (menuId) => {
//     try {
//       await axios.delete(`${backendURL}/dailyPeriod/delete/${menuId}`, authHeader);
//       alert("Deleted!");
//       setCreatedMenus((prev) => prev.filter((menu) => menu.id !== menuId));
//     } catch (error) {
//       console.error("Failed to delete menu:", error);
//     }
//   };
  

//   return (
//     <>
//       <div className="day-position">
//         <div className="day-dropdown">
//           Select Plan
//           <select
//             value={selectedPlan}
//             onChange={(e) => setSelectedPlan(e.target.value)}
//           >
//             <option value="">-- Select Plan --</option>
//             {plans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="day-dropdown">
//           Select Period
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//           >
//             <option value="">-- Select Day --</option>
//             {periods.map((period) => (
//               <option key={period.id} value={period.id}>
//                 {period.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {!isComboPlan && (
//           <div className="day-dropdown">
//             Select Meal Type
//             <select
//               value={selectedMealType}
//               onChange={(e) => setSelectedMealType(e.target.value)}
//             >
//               <option value="">-- Select Meal Type --</option>
//               {Object.keys(foodItems).map((mealType) => (
//                 <option key={mealType} value={mealType}>
//                   {mealType}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {isComboPlan ? (
//           <div className="food-table-container">
//             <p>Select Food Items for Each Meal Type (Combo Plan)</p>
//             <div className="food-table">
//               {Object.keys(foodItems).map((mealType) => (
//                 <div className="meal-column" key={mealType}>
//                   <h4>{mealType}</h4>
//                   {foodItems[mealType].map((item) => {
//                     const foodId = item.subscription_food_menu_id;
//                     const isSelected =
//                       selectedFoodItems[mealType]?.includes(foodId) || false;

//                     return (
//                       <div
//                         key={foodId}
//                         className={`food-item ${isSelected ? "selected" : ""}`}
//                         onClick={() => toggleFoodSelection(mealType, foodId)}
//                       >
//                         {item.food_name}
//                       </div>
//                     );
//                   })}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           selectedMealType && (
//             <div className="food-table-container">
//               <p>Select Food Item</p>
//               <div className="food-table">
//                 <div className="meal-column">
//                   <h4>{selectedMealType}</h4>
//                   {foodItems[selectedMealType]?.map((item) => {
//                     const foodId = item.subscription_food_menu_id;
//                     const isSelected = selectedFoodItem === String(foodId);

//                     return (
//                       <div
//                         key={foodId}
//                         className={`food-item ${isSelected ? "selected" : ""}`}
//                         onClick={() => setSelectedFoodItem(String(foodId))}
//                       >
//                         {item.food_name}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           )
//         )}

//         <div className="day-save">
//           <button
//             onClick={handleSubmit}
//             style={{
//               textAlign: "center",
//               fontWeight: "bold",
//               fontSize: "1.3rem",
//             }}
//           >
//             Save
//           </button>
//         </div>
        
//         <div className="created-menu-container">
//   <h3>Created Daily Menus</h3>
//   <div className="created-menu-cards">
//     {createdMenus.map((menu, idx) => (
//       <div className="menu-card" key={idx}>
//         <h4>{menu.planName}</h4>
//         <p><strong>Period:</strong> {menu.period}</p>
//         {menu.foodItems.map((meal, i) => (
//           <div key={i}>
//             <p><strong>{meal.mealType}</strong></p>
//             <ul>
//               {meal.items.map((item, j) => (
//                 <li key={j}>{item.food_name}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//         <button onClick={() => handleSetActive(menu.id)}>Active</button>
// <button onClick={() => handleDelete(menu.id)}>Delete</button>

//       </div>
//     ))}
//   </div>
// </div>

//       </div>
//     </>
//   );
// };

// export default MainDailymenu;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainDailymenu.css";

const MainDailymenu = () => {
  const [periods, setPeriods] = useState([]);
  const [foodItems, setFoodItems] = useState({});
  const [plans, setPlans] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [dailyMenus, setDailyMenus] = useState([]);
  const [existingMenus, setExistingMenus] = useState([]);


  const backendURL = process.env.REACT_APP_BACKEND_SERVER_URL;
  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [periodRes, foodRes, planRes,dailyMenuRes] = await Promise.all([
          axios.get(`${backendURL}/dailyPeriod/getPeriod`, authHeader),
          axios.get(`${backendURL}/foodMenu/getMenu`, authHeader),
          axios.get(`${backendURL}/parentPlan/getPlan`, authHeader),
          axios.get(`${backendURL}/dailyPeriod/getDaily`, authHeader), // NEW

        ]);
        const formattedPeriods = Array.isArray(periodRes.data.getDays)
          ? periodRes.data.getDays.map((item) => ({
              id: item.id,
              name: item.period,
            }))
          : [];
  
        const grouped = foodRes.data.groupedMenu || [];
  
        const formattedPlans = Array.isArray(planRes.data.parentPlans)
          ? planRes.data.parentPlans.map((plan) => ({
              id: plan.id,
              name: plan.plan_name,
            }))
          : [];
  
        setPeriods(formattedPeriods);
        setFoodItems(grouped);
        setPlans(formattedPlans);
        setDailyMenus(dailyMenuRes.data.data); 
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
  
    fetchData();
  }, [backendURL]);
  

  const fetchExistingMenus = async () => {
    try {
      const res = await axios.get(`${backendURL}/dailyPeriod/getDaily`, authHeader);
      setExistingMenus(res.data.data || []);
    } catch (error) {
      console.error("Error fetching existing daily menus:", error);
    }
  };
  
  useEffect(() => {
    fetchExistingMenus(); 
  }, [backendURL]);
 

  const handleFoodSelection = (mealType, foodId) => {
    setSelectedFoodItems((prev) => ({
      ...prev,
      [mealType]: foodId,
    }));
  };
const handleSave = async () => {
  if (!selectedPlan || !selectedPeriod || Object.keys(selectedFoodItems).length === 0) {
    alert("Please select plan, period, and food items.");
    return;
  }

  const subscription_food_menu_ids = Object.values(selectedFoodItems);

  try {
    const res = await axios.post(
      `${backendURL}/dailyPeriod/createDaily`,
      {
        parent_plan_id: Number(selectedPlan),
        period: Number(selectedPeriod),
        subscription_food_menu_ids,
      },
      authHeader
    );
console.log("Daily Menu created :",res.data)
    alert("Daily menu saved successfully!");
    setSelectedFoodItems({});

   
  } catch (err) {
    console.error("Error saving daily menu:", err);
    alert("Error saving daily menu.");
  }
};
const handleSetActive = async (plan_id, period_id) => {
  try {
    await axios.post(
      `${backendURL}/dailyPeriod/setActive`,
      {
        parent_plan_id: plan_id,
        period: period_id
      },
      authHeader
    );
    alert("Menu set as active");
    fetchExistingMenus(); // Refresh after action
  } catch (error) {
    console.error("Error setting active menu:", error);
    alert("Failed to set active menu");
  }
};

const handleDeleteMenu = async (plan_id,period_id) => {
  if (!window.confirm("Are you sure you want to delete this menu?")) return;

  try {
    await axios.delete(`${backendURL}/dailyPeriod/delete/${plan_id}/${period_id}`, authHeader);
    alert("Menu deleted successfully");
    fetchExistingMenus(); 
  } catch (error) {
    console.error("Error deleting menu:", error);
    alert("Failed to delete menu");
  }
};

 

  return (
    <div className="day-position">
      <div className="day-dropdown">
        Select Plan
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          <option value="">-- Select Plan --</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>

      <div className="day-dropdown">
        Select Period
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="">-- Select Period --</option>
          {periods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPlan && (
        <div className="food-table-container">
          <p>Select Food Items (Only one per Meal Type)</p>
          <div className="food-table">
            {Object.keys(foodItems).map((mealType) => (
              <div className="meal-column" key={mealType}>
                <h4>{mealType}</h4>
                {foodItems[mealType].map((item) => {
                  const foodId = item.subscription_food_menu_id;
                  const isSelected = selectedFoodItems[mealType] === foodId;

                  const handleClick = () => {
                    handleFoodSelection(mealType, foodId);
                  };

                  return (
                    <div
                      key={foodId}
                      className={`food-item ${isSelected ? "selected" : ""}`}
                      onClick={handleClick}
                    >
                      {item.food_name}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      

<div className="day-save">
  <button
    onClick={handleSave}
    style={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.3rem",
    }}
  >
    Save
  </button>
</div>

{/* <div className="menu-cards-container">
  <h3>Created Daily Menus</h3>
  {dailyMenus.length === 0 ? (
    <p>No menus created yet.</p>
  ) : (
    dailyMenus.map((menu, index) => (
      <div className="menu-card" key={index}>
        <h4>{menu.plan_name}</h4>
        <p><strong>Period:</strong> {menu.day}</p>
        <div className="meal-types">
          {menu.meal_types.map((meal, idx) => (
            <div key={idx} className="meal-section">
              <h5>{meal.meal_type}</h5>
              <ul>
                {meal.food_items.map((food) => (
                  <li key={food.id}>{food.item_name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ))
  )}
</div> */}
<h3 style={{ marginTop: "2rem" }}>Existing Daily Menus</h3>
<div className="menu-cards-container">
  {existingMenus.map((menu) => (
    <div className="menu-card" key={`${menu.plan_id}-${menu.period_id}`}>
      <h4>{menu.plan_name} - {menu.day}</h4>
      {menu.meal_types.map((meal, idx) => (
        <div key={idx}>
          <strong>{meal.meal_type}:</strong>{" "}
          {meal.food_items.map((item) => item.item_name).join(", ")}
        </div>
      ))}
      <div className="menu-actions">
        <button onClick={() => handleSetActive(menu.plan_id, menu.period_id)}>
          Set Active
        </button>
        <button onClick={() => handleDeleteMenu(menu.plan_id,menu.period_id)}>
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default MainDailymenu;
