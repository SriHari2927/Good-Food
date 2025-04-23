const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPeriodical = async (req, res) => {
  try {
    const { period, comments } = req.body;

    const newPeriod = await prisma.periodical.create({
      data: {
        period,
        comments,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(200).json({ message: "Created ", newPeriod });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No periodical created yet" });
  }
};

const getPeriodical = async (req, res) => {
  try {
    const getDays = await prisma.periodical.findMany();
    res.status(200).json({ message: "Success", getDays });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failure" });
  }
};



// const createDailyMenu = async (req, res) => {
//   try {
//     const { parent_plan_id, period, subscription_food_menu_ids } = req.body;

//     const createdMenus = await Promise.all(
//       subscription_food_menu_ids.map((foodId) =>
//         prisma.daily_Menu.create({
//           data: {
//             parent_plan_id: Number(parent_plan_id),
//             period: Number(period),
//             subscription_food_menu_id: Number(foodId),
//           },
//         })
//       )
//     );

//     res.status(200).json({ message: "Daily Menus Created", createdMenus });
//   } catch (error) {
//     console.error("Error creating daily menus:", error);
//     res.status(500).json({ error: "Failed to create daily menus" });
//   }
// };



const createDailyMenu = async (req, res) => {
  try {
    const { parent_plan_id, period, subscription_food_menu_ids } = req.body;

    if (!parent_plan_id || !period || !Array.isArray(subscription_food_menu_ids)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const entries = subscription_food_menu_ids.map((id) => ({
      parent_plan_id,
      period,
      subscription_food_menu_id: id,
      created_at: new Date(),
      updatedAt: new Date(),
    }));

    const newMenus = await prisma.daily_Menu.createMany({
      data: entries,
    });

    res.status(200).json({ message: "Daily Menus Created", newMenus });
  } catch (error) {
    console.error("Error creating daily menus:", error);
    res.status(500).json({ error: "Failed to create daily menus" });
  }
};



// const getDailyMenu = async (req,res) => {
//   try {
//     const fetchDailyMenu = await prisma.daily_Menu.findMany({
//       include : {
//         parentPlan: {
//           select : {
//             id : true,
//             plan_name : true
//           }
//         },
//         periods: {
//           select : {
//             id : true,
//             period : true
//           }
//         },
//         subFoodMenuu : {
          
//           select : {
//             FoodItems : {
//               select : {
//                 id : true,
//                 item_name:true
//               }
//             }
//           }
//         }
//       }
//     })
//     const formattedDailyMenu = fetchDailyMenu.map(item => ({
//       id:item.id,
//       plan_id:item.parentPlan.id,
//       plan_name:item.parentPlan.plan_name,
//       day:item.periods.period,
//       food_item_id:item.subFoodMenuu.FoodItems.id,
//       food_item:item.subFoodMenuu.FoodItems.item_name
//     }))
//     res.status(200).json({message : "Success",formattedDailyMenu})
//   } catch (error) {
//     console.log(error)
//     res.status(404).json({error : "No Daily Menu fetched "})
//   }
// }



const getDailyMenu = async (req, res) => {
  try {
    const fetchDailyMenu = await prisma.daily_Menu.findMany({
      include: {
        parentPlan: {
          select: {
            id: true,
            plan_name: true
          }
        },
        periods: {
          select: {
            id: true,
            period: true
          }
        },
        subFoodMenuu: {
          select: {
            mealType: {
              select: {
                id: true,
                meal_type: true
              }
            },
            FoodItems: {
              select: {
                id: true,
                item_name: true
              }
            }
          }
        }
      }
    });

    const grouped = [];

    fetchDailyMenu.forEach(item => {
      const { id: planId, plan_name } = item.parentPlan;
      const { id: periodId, period: day } = item.periods;
      const { mealType, FoodItems } = item.subFoodMenuu;

      // Find group by plan and period
      let existingGroup = grouped.find(
        group => group.plan_id === planId && group.period_id === periodId
      );

      const foodItem = {
        id: FoodItems.id,
        item_name: FoodItems.item_name
      };

      if (existingGroup) {
        // Check if meal type already exists
        const existingMealType = existingGroup.meal_types.find(
          mt => mt.meal_type === mealType.meal_type
        );

        if (existingMealType) {
          existingMealType.food_items.push(foodItem);
        } else {
          existingGroup.meal_types.push({
            meal_type: mealType.meal_type,
            food_items: [foodItem]
          });
        }
      } else {
        grouped.push({
          plan_id: planId,
          plan_name,
          period_id: periodId,
          day,
          meal_types: [
            {
              meal_type: mealType.meal_type,
              food_items: [foodItem]
            }
          ]
        });
      }
    });

    res.status(200).json({ message: "Success", data: grouped });
  } catch (error) {
    console.log("Error fetching grouped daily menu:", error);
    res.status(500).json({ error: "No Daily Menu fetched" });
  }
};

// const getDailyMenu = async (req, res) => {
//   try {
//     const rawMenus = await prisma.daily_Menu.findMany({
//       include: {
//         parentPlan: true,
//         periods: true,
//         subFoodMenuu: {
//           include: {
//             FoodItems: true,
//           },
//         },
//       },
//     });

//     const grouped = [];

//     rawMenus.forEach((entry) => {
//       const { parent_plan_id, period, isDaily, created_at, updatedAt, parentPlan, periods, subFoodMenuu } = entry;

//       // Try to find existing group
//       const existingGroup = grouped.find(
//         (group) => group.parent_plan_id === parent_plan_id && group.period === period
//       );

//       const mealType = subFoodMenuu.mealType; // assuming you store "Breakfast", "Lunch", etc.
//       const foodItems = subFoodMenuu.FoodItems || [];

//       if (existingGroup) {
//         if (!existingGroup.mealTypes[mealType]) {
//           existingGroup.mealTypes[mealType] = [];
//         }
//         existingGroup.mealTypes[mealType].push(...foodItems);
//       } else {
//         grouped.push({
//           id: entry.id, // First matching ID
//           parent_plan_id,
//           period,
//           isDaily,
//           created_at,
//           updatedAt,
//           parentPlan,
//           periods,
//           mealTypes: {
//             [mealType]: [...foodItems],
//           },
//         });
//       }
//     });

//     res.status(200).json({ message: "Success", data: grouped });
//   } catch (error) {
//     console.error("Error fetching grouped daily menu:", error);
//     res.status(500).json({ error: "No Daily Menu fetched" });
//   }
// };




const getAllMenu = async (req, res) => {
  const { period } = req.body;

  try {
    const getDaily = await prisma.daily_Menu.findMany({
      where: { period },
      select: {
        periods: { select: { period: true } },
        subFoodMenuu: {
          select: {
            id: true,
            food_item_id: true,

            FoodItems: {
              select: {
                item_name: true,
                image_url: true,
              },
            },

            meal_type_id: true,
            mealType: { select: { meal_type: true } },
            FoodSubscription: {
              select: {
                parentPlan1: {
                  select: {
                    id: true,
                    plan_name: true,
                  },
                },
                TierSub: {
                  select: {
                    id: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Format the data into the desired structure
    const formattedMenu = getDaily.reduce((acc, item) => {
      const day = item.periods.period || "Uncategorized";
      const mealType = item.subFoodMenuu.mealType.meal_type || "Other";
      const foodName = item.subFoodMenuu.FoodItems.item_name;
      const image = item.subFoodMenuu.FoodItems.image_url;
      const plan_id = item.subFoodMenuu.FoodSubscription.parentPlan1.id;
      const plan_name =
        item.subFoodMenuu.FoodSubscription.parentPlan1.plan_name;
      const tierId = item.subFoodMenuu.FoodSubscription.TierSub.id;
      const tier = item.subFoodMenuu.FoodSubscription.TierSub.type;

      if (!acc[day]) acc[day] = {};
      if (!acc[day][mealType]) acc[day][mealType] = [];

      acc[day][mealType].push({
        food_name: foodName,
        parent_plan_id: plan_id,
        plan_name: plan_name,
        tier_id: tierId,
        tier: tier,
        meal_type_id: item.subFoodMenuu.meal_type_id,
        meal_type: item.subFoodMenuu.mealType.meal_type,
        image: image,
      });

      return acc;
    }, {});

    res.status(200).json({ message: "Success", formattedMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};


// const setActiveDailyMenu = async (req, res) => {
//   try {
//     const { parent_plan_id, period, menu_id } = req.body;

//     await prisma.daily_Menu.updateMany({
//       where: {
//         parent_plan_id: Number(parent_plan_id),
//         period: Number(period),
//       },
//       data: { isDaily: false },
//     });

//     await prisma.daily_Menu.update({
//       where: { id: Number(menu_id) },
//       data: { isDaily: true },
//     });

//     res.status(200).json({ message: "Daily Menu activated successfully" });
//   } catch (error) {
//     console.error("Error setting active menu:", error);
//     res.status(500).json({ error: "Failed to set active menu" });
//   }
// };



// const setActiveDailyMenu = async (req, res) => {
//   const { parent_plan_id, period } = req.body;

//   try {
//     await prisma.daily_Menu.updateMany({
//       where: {
//         parent_plan_id: Number(parent_plan_id),
//         period,
        
//       },
//       data: { isDaily: false },
//     });

//     await prisma.daily_Menu.updateMany({
//       where: {
//         parent_plan_id: Number(parent_plan_id),
//         period,
        
//       },
//       data: { isDaily: true },
//     });

//     res.status(200).json({ message: "Set as active menu." });
//   } catch (error) {
//     console.error("Error setting active menu:", error);
//     res.status(500).json({ error: "Failed to set active menu." });
//   }
// };



const setActiveDailyMenu = async (req, res) => {
  const { parent_plan_id, period } = req.body;

  try {
    await prisma.daily_Menu.updateMany({
      where: {
        parent_plan_id: Number(parent_plan_id),
        isDaily: true,
      },
      data: { isDaily: false },
    });

    await prisma.daily_Menu.updateMany({
      where: {
        parent_plan_id: Number(parent_plan_id),
        period,
      },
      data: { isDaily: true },
    });

    res.status(200).json({ message: "Set as active menu." });
  } catch (error) {
    console.error("Error setting active menu:", error);
    res.status(500).json({ error: "Failed to set active menu." });
  }
};






const getActiveDailyMenu = async (req, res) => {
  try {
    const { parent_plan_id } = req.query;

    const parentPlan = await prisma.parent_Plan.findUnique({
      where: { id: Number(parent_plan_id) },
    });

    if (!parentPlan) {
      return res.status(404).json({ error: "Parent plan not found" });
    }

    const activeMenus = await prisma.daily_Menu.findMany({
      where: {
        parent_plan_id: Number(parent_plan_id),
        isDaily: true,
      },
      include: {
        subFoodMenuu: {
          include: {
            FoodItems: true,
            mealType: true,
          },
        },
        periods: true,
      },
    });

    const groupedMenu = {};

    // Apply same grouping for both Combo and Individual
    activeMenus.forEach((menu) => {
      const item = menu.subFoodMenuu;
      if (!item) return;

      const mealType = item.mealType?.meal_type || "Others";
      if (!groupedMenu[mealType]) groupedMenu[mealType] = [];

      groupedMenu[mealType].push({
        name: item.FoodItems.item_name,
        desc: item.FoodItems.description,
        img: item.FoodItems.image_url,
      });
    });

    res.status(200).json(groupedMenu);
  } catch (error) {
    console.error("Error fetching active daily menu:", error);
    res.status(500).json({ error: "Failed to fetch active menu" });
  }
};


// GET /dailyPeriod/getOneDaily?parent_plan_id=1&period=3
const getOneDailyMenu = async (req, res) => {
  const { parent_plan_id, period } = req.query;

  try {
    const data = await prisma.daily_Menu.findMany({
      where: {
        parent_plan_id: Number(parent_plan_id),
        period: Number(period),
      },
      include: {
        subFoodMenuu: true,
      },
    });

    const grouped = {};

    data.forEach((entry) => {
      const mealType = entry.meal_type;
      if (!grouped[mealType]) grouped[mealType] = [];
      grouped[mealType].push(entry.subFoodMenuu);
    });

    res.status(200).json(grouped);
  } catch (error) {
    console.error("Error fetching daily menu:", error);
    res.status(500).json({ error: "Failed to fetch menu." });
  }
};


const deleteDailyMenu = async (req, res) => {
  try {
    const { period_id } = req.params;

    await prisma.daily_Menu.delete({
      where: {
        period : Number(period_id)
       },
    });

    res.status(200).json({ message: "Daily Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Failed to delete menu" });
  }
};



// PUT /dailyPeriod/updateDaily
const updateDailyMenu = async (req, res) => {
  const { parent_plan_id, period, mealTypeToFoodItems } = req.body;

  try {
    await prisma.daily_Menu.deleteMany({
      where: {
        parent_plan_id: Number(parent_plan_id),
        period,
      },
    });

    const entries = [];

    for (const [meal_type, foodIds] of Object.entries(mealTypeToFoodItems)) {
      for (const foodId of foodIds) {
        entries.push(
          prisma.daily_Menu.create({
            data: {
              parent_plan_id: Number(parent_plan_id),
              period,
              meal_type,
              subscription_food_menu_id: Number(foodId),
              is_active: false,
            },
          })
        );
      }
    }

    await Promise.all(entries);
    res.status(200).json({ message: "Daily menu updated successfully." });
  } catch (error) {
    console.error("Error updating daily menu:", error);
    res.status(500).json({ error: "Failed to update menu." });
  }
};

const getUnifiedDailyMenu = async (req, res) => {
  try {
    const { planName, tier, mealType } = req.query;


    // Step 1: Determine if it's a combo plan
    const subscription = await prisma.subscription.findFirst({
      where: {
        parentPlan1: { plan_name: planName },
        TierSub: { type: tier },
      },
      select: { meal_type_id: true },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const isCombo = subscription.meal_type_id === 4;

    // Step 2: Fetch relevant daily menu items
    const menus = await prisma.daily_Menu.findMany({
      where: {
        isDaily: true,
        subFoodMenuu: {
          FoodSubscription: {
            parentPlan1: { plan_name: planName },
            TierSub: { type: tier },
            ...(isCombo ? {} : { MealSub: { meal_type: mealType } }),
          },
        },
      },
      include: {
        subFoodMenuu: {
          include: {
            FoodItems: true,
            mealType: true,
            FoodSubscription: {
              include: {
                parentPlan1: true,
                TierSub: true,
              },
            },
          },
        },
        periods: true,
      },
    });

    const response = {
      planName: planName || "Unknown Plan",
      tier: tier || "Unknown Tier",
      meals: {},
    };
    

    menus.forEach(menu => {
      const item = menu.subFoodMenuu;
      if (!item) return;

      const meal = item.mealType?.meal_type || "Others";

      if (!response.meals[meal]) {
        response.meals[meal] = [];
      }

      response.meals[meal].push({
        name: item.FoodItems.item_name,
        desc: item.FoodItems.description,
        img: item.FoodItems.image_url,
      });
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching unified daily menu:", error);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

// const getUserDailyMenu = async (req, res) => {
//   try {
//     const { customer_id } = req.user;

//     const userSubscription = await prisma.user_Subscription.findFirst({
//       where: {
//         customer_id,
//         status: {
//           in: ["Pending", "Active"],
//         },
//       },
//       orderBy: {
//         created_at: "desc",
//       },
//       include: {
//         Subscription: {
//           include: {
//             parentPlan1: true,
//             MealSub: true,
//             TierSub: true,
//           },
//         },
//       },
//     });

//     if (!userSubscription) {
//       return res.status(404).json({ error: "No active subscription found for user" });
//     }

//     const subscription = userSubscription.Subscription;
//     const parent_plan_id = subscription.parentPlan1.id;

//     // 2. Fetch the Daily_Menu entries for this plan
//     const dailyMenus = await prisma.daily_Menu.findMany({
//       where: {
//         parent_plan_id,
//         isDaily: true,
//       },
//       include: {
//         periods: true,
//         subFoodMenuu: {
//           select: {
//             meal_type_id:true,
//             FoodItems: {
//               select: {
//                 id: true,
//                 item_name: true,
//                 image_url: true,
//               },
//           },
//           },
          
            
//         },
//       },
//     });

//     return res.status(200).json({
//       message: "Fetched daily menu based on user's subscription",
//       dailyMenus,
//     });
//   } catch (error) {
//     console.error("Error fetching daily menu for user:", error.message || error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


const getUserDailyMenu = async (req, res) => {
  try {
    const { customer_id } = req.user;

    // Step 1: Get user's active or pending subscription
    const userSubscription = await prisma.user_Subscription.findFirst({
      where: {
        customer_id,
        status: {
          in: ["Pending", "Active"],
        },
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        Subscription: {
          include: {
            parentPlan1: true,
            MealSub: true,
            TierSub: true,
            FoodSubscription: {
              include: {
                FoodItems: true,
              },
            },
          },
        },
      },
    });

    if (!userSubscription) {
      return res.status(404).json({ error: "No active subscription found for user" });
    }

    const subscription = userSubscription.Subscription;
    const parent_plan_id = subscription.parent_plan_id;

    // Step 2: Get subscription_food_menu_ids linked to this subscription only
    const validFoodMenuIds = subscription.FoodSubscription.map(f => f.id);

    // Step 3: Fetch only matching Daily_Menu entries with those subscription_food_menu_ids
    const dailyMenus = await prisma.daily_Menu.findMany({
      where: {
        parent_plan_id,
        isDaily: true,
        subscription_food_menu_id: {
          in: validFoodMenuIds,
        },
      },
      include: {
        periods: true,
        subFoodMenuu: {
          select: {
            meal_type_id: true,
            FoodItems: {
              select: {
                id: true,
                item_name: true,
                image_url: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Fetched daily menu based on user's subscription",
      dailyMenus,
    });
  } catch (error) {
    console.error("Error fetching daily menu for user:", error.message || error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = {
  createDailyMenu,
  getDailyMenu,
  createPeriodical,
  getPeriodical,
  getAllMenu,
  setActiveDailyMenu,
  getActiveDailyMenu,
  deleteDailyMenu,
  getOneDailyMenu,
  updateDailyMenu,
  getUnifiedDailyMenu,
  getUserDailyMenu
};





















// const createDailyMenu = async (req, res) => {
//   try {
//     const {  period, subscription_food_menu_ids } = req.body;

//     const entries = subscription_food_menu_ids.map(({ period, subscription_food_menu_id }) => ({
//       period,
//       subscription_food_menu_id,
//       created_at: new Date(),
//       updatedAt: new Date(),
//     }));

//     const newMenus = await prisma.daily_Menu.createMany({
//       data: entries,
//     });
// console.log("entries : ",entries)
//     res.status(200).json({ message: "Daily Menus Created", newMenus });
//   } catch (error) {
//     console.error("Error creating daily menus:", error);
//     res.status(500).json({ error: "Failed to create daily menus" });
//   }
// };


// const getActiveDailyMenu = async (req, res) => {
//   try {
//     const { parent_plan_id } = req.query;

//     const activeMenus = await prisma.daily_Menu.findMany({
//       where: {
//         parent_plan_id: Number(parent_plan_id),
//         isDaily: true,
//       },
//       include: {
//         subFoodMenuu: {
//           include: {
//             FoodItems: true,
//             mealType: true,
//           },
//         },
//         periods: true,
//       },
//     });

//     res.status(200).json(activeMenus);
//   } catch (error) {
//     console.error("Error fetching active daily menu:", error);
//     res.status(500).json({ error: "Failed to fetch active menu" });
//   }
// };
