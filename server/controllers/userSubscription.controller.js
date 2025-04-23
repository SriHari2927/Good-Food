const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserSubscription = async (req, res) => {
  try {
    const getSubscriptions = await prisma.user_Subscription.findMany();
    res.status(200).json({ message: "User Subscriped", getSubscriptions });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No user subscriped" });
  }
};

const getUserSubscriptionDetails = async (req, res) => {
  try {
    const { customer_id } = req.user;
    const userSubscriptions = await prisma.user_Subscription.findMany({
      where: { customer_id },

      include: {
        Subscription: {
          select: {
            parentPlan1: { select: { plan_name: true } },
            DurationSub: { select: { quantity: true } },
            DurationSubs: {
              select: {
                actual_days: true,
                addon_days: true,
              },
            },
            MealSub: { select: { meal_type: true } },
            PricingDetails: { select: { price: true } },
            TierSub: { select: { type: true } },
          },
        },
      },
    });

    console.log("User Deatils", userSubscriptions);

    res.status(200).json({
      message: "User Subscription Details fetched",
      userSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching user subscription details:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch user subscription details",
    });
  }
};


// const getMenuWithSubID = async (req, res) => {
//   try {
    
//     const { id } = req.params;
//     const getFood = await prisma.user_Subscription.findMany({
//       where: { id : parseInt(id) },
//       select: {
//         subscription_id : true,
//         Subscription : {
//           select : {
//             MealSub:{
//               select:{
//                 id:true,
//                 meal_type:true
//               }
//             },
//             FoodSubscription : {
              
//               select : {
//                 mealType:{
//                   select:{
//                     id:true,
//                     meal_type:true
//                   }
//                 },
//                 FoodItems : {
//                   select : {
//                     id:true,
//                     item_name : true,
//                     price_id:true,
//                     SubscriptionPriceDetails : {
//                       select : {
//                         price:true 
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       },
//     });

//     const transformedData = getFood.map((item) => ({
//       subscription_id: item.subscription_id,
//       meal_type_id:item.Subscription.MealSub.id,
//       subscription_meal_type:item.Subscription.MealSub.meal_type,  
//       FoodItems: item.Subscription.FoodSubscription.map((fs) => ({
//         id: fs.FoodItems.id,
//         item_name: fs.FoodItems.item_name,
//         food_meal_type_id : fs.mealType.id,
//         food_meal_type : fs.mealType.meal_type,
//         price_id: fs.FoodItems.price_id,
//         price: fs.FoodItems.SubscriptionPriceDetails?.price || null,
//       })),
//     }));

//     res.status(200).json({ message: "Fetched successfully", data: transformedData });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ error: "FAiled to fetch the food items" });
//   }
// };



const getMenuWithSubID = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch subscription, meal types, and food items
    const getFood = await prisma.user_Subscription.findMany({
      where: { id: parseInt(id) },
      select: {
        subscription_id: true,
        Subscription: {
          select: {
            MealSub: {
              select: {
                id: true,
                meal_type: true,
              }
            },
            FoodSubscription: {
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
                    item_name: true,
                    image_url:true,
                    price_id: true,
                    SubscriptionPriceDetails: {
                      select: {
                        price: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // Fetch days from the Periodical table
    const days = await prisma.periodical.findMany({
      select: {
        id: true,
        period: true // Assuming period is the day name (Monday, Tuesday, etc.)
      }
    });

    // Transform data to match the required response structure
    const transformedData = getFood.map((item) => {
      const foodItems = item.Subscription.FoodSubscription.map((fs) => ({
        id: fs.FoodItems.id,
        item_name: fs.FoodItems.item_name,
        food_meal_type_id: fs.mealType.id,
        food_meal_type: fs.mealType.meal_type,
        image_url:fs.FoodItems.image_url,
        price_id: fs.FoodItems.price_id,
        price: fs.FoodItems.SubscriptionPriceDetails?.price || null
      }));

      return {
        subscription_id: item.subscription_id,
        meal_type_id: item.Subscription.MealSub.id,
        subscription_meal_type: item.Subscription.MealSub.meal_type,
        days: days.map((day) => ({
          day_id: day.id,
          day_name: day.period,
          FoodItems: foodItems // Same food items for each day
        }))
      };
    });

    res.status(200).json({ message: "Fetched successfully", data: transformedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch the food items" });
  }
};


module.exports = {
  getUserSubscription,
  getUserSubscriptionDetails,
  getMenuWithSubID,
};
