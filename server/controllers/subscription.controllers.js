// const express = require('express')
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const getAllSubscription = async (req,res) => {
//     try {
//         const getSubs = await prisma.subscription.findMany()
//         res.status(200).json({message : "All Subscription fetched",getSubs})
//     } catch (error) {
//        console.log(error)
//        res.status(404).json({error : "No Subscriptions found"})
//     }
// }

// const getSubscription = async (req,res) => {
// try {
//     const getSUB = await prisma.subscription.findMany({
//         include : {
//            parentPlan1 : true,
//            SubscriptionPayments : true
//         }
//     })
//     res.status(200).json({message : "Subscription found",getSUB})
// } catch (error) {
//     console.log(error)
//     res.status(404).json({error : "Subscriptions not found "})
// }
// }

// const getSubscriptionNames = async (req, res) => {
//     try {
//       console.log("First")
//       const getSUB = await prisma.subscription.findMany({
//         select: {
//           parentPlan1: {select: { plan_name: true },},
//           TierSub: { select: { type: true } },
//           DurationSub: { select: { quantity: true } },
//           DurationSubs : {select : {actual_days : true, addon_days : true}},
//           MealSub: { select: { meal_type: true } },
//           PricingDetails: { select: { price: true } },
//         },
//       });
//       console.log("second")

//       const groupedSubscriptions = getSUB.reduce((acc, sub) => {
//         const key = `${sub.parentPlan1.plan_name} ${sub.TierSub.type}`;
//         const mealType = sub.MealSub.meal_type;

//         if (!acc[key]) {
//           acc[key] = {};
//         }

//         if (!acc[key][mealType]) {
//           acc[key][mealType] = [];
//         }

//         acc[key][mealType].push({
//           id: sub.id,
//           days: sub.DurationSubs.actual_days,
//           price: sub.PricingDetails.price,
//         });

//         return acc;
//       }, {});

//       res.status(200).json({ message: "Subscription found", groupedSubscriptions });
//     } catch (error) {
//       console.log(error);
//       res.status(404).json({ error: "Subscriptions not found" });
//     }
//   };

// // const getSubscriptionNames = async (req, res) => {
// //   try {
// //       const { planName, tier, mealType } = req.query;

// //       const filterConditions = {};

// //       if (planName) {
// //           filterConditions.parentPlan1 = { plan_name: planName };
// //       }
// //       if (tier) {
// //           filterConditions.TierSub = { type: tier };
// //       }
// //       if (mealType) {
// //           filterConditions.MealSub = { meal_type: mealType };
// //       }

// //       const getSUB = await prisma.subscription.findMany({
// //           where: filterConditions,
// //           include: {
// //               parentPlan1: {
// //                   select: { plan_name: true },
// //               },
// //               TierSub: { select: { type: true } },
// //               DurationSub: { select: { days: true } },
// //               MealSub: { select: { meal_type: true } },
// //               PricingDetails: { select: { price: true } },
// //           },
// //       });

// //       const groupedSubscriptions = getSUB.reduce((acc, sub) => {
// //           const key = `${sub.parentPlan1.plan_name} ${sub.TierSub.type}`;
// //           const mealType = sub.MealSub.meal_type;

// //           if (!acc[key]) {
// //               acc[key] = {};
// //           }

// //           if (!acc[key][mealType]) {
// //               acc[key][mealType] = [];
// //           }

// //           acc[key][mealType].push({
// //               days: sub.DurationSub.days,
// //               price: sub.PricingDetails.price,
// //           });

// //           return acc;
// //       }, {});

// //       res.status(200).json({ message: "Subscription found", groupedSubscriptions });
// //   } catch (error) {
// //       console.log(error);
// //       res.status(404).json({ error: "Subscriptions not found" });
// //   }
// // };

// const createSubscription = async (req, res) => {
//     try {
//       const {
//         parent_plan_id,
//         plan_description,
//         duration_id,
//         quantity_id,
//         tier_id,
//         meal_type_id,
//         price_id,
//       } = req.body;

//       const createSubs = await prisma.subscription.create({
//         data: {
//           parent_plan_id,
//           plan_description,
//           tier_id,
//           duration_id,
//           quantity_id,
//           meal_type_id,
//           price_id,
//           created_at: new Date(),
//           updatedAt: new Date(),
//         },
//       });

//       res.status(200).json({ message: "Successfully created subscription", createSubs });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to create subscription" });
//     }
//   };

// module.exports={
//     getAllSubscription,
//     getSubscriptionNames,
//     getSubscription,
//     createSubscription
// }





const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendNotification = require("../utils/notificationTrigger.utils");
const {
  SubscriptionTemplateHTML,
} = require("../utils/EmailTemplates/SubscriptionTemplate");

const { format, addDays } = require("date-fns");


const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },

      include: {
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
    });

    res
      .status(200)
      .json({ message: "Subscription details fetched", subscription });
  } catch (error) {
    console.error("Error fetching subscription by ID:", error);
    res.status(500).json({ error: "Failed to fetch subscription details" });
  }
};

const getSubscription = async (req, res) => {
  try {
    const getSUB = await prisma.subscription.findMany({
      include: {
        parentPlan1: true,
        SubscriptionPayments: true,
      },
    });
    res.status(200).json({ message: "Subscription found", getSUB });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Subscriptions not found " });
  }
};

const getSubscriptionNames = async (req, res) => {
  try {
    const getSUB = await prisma.subscription.findMany({
      include: {
        parentPlan1: { select: { plan_name: true } },
        TierSub: { select: { type: true } },
        DurationSubs: { select: { actual_days: true, addon_days: true } },
        MealSub: { select: { meal_type: true } },
        PricingDetails: { select: { price: true } },
      },
    });

    // Restructuring the response
    const formattedSubscriptions = getSUB.reduce((acc, sub) => {
      const planName = sub.parentPlan1.plan_name;
      const tierType = sub.TierSub.type;
      const mealType = sub.MealSub.meal_type;

      if (!acc[planName]) {
        acc[planName] = {};
      }

      if (!acc[planName][tierType]) {
        acc[planName][tierType] = {};
      }

      if (!acc[planName][tierType][mealType]) {
        acc[planName][tierType][mealType] = [];
      }

      acc[planName][tierType][mealType].push({
        id: sub.id,
        days: sub.DurationSubs?.actual_days || "N/A",
        price: sub.PricingDetails?.price || "N/A",
      });

      return acc;
    }, {});

    res.status(200).json({ message: "Subscription found", formattedSubscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching subscriptions" })
  }
};



// const getMeals = async (req, res) => {
//   try {
//     const { planName, mealType, tier } = req.params;

//     const meals = await prisma.subscription.findMany({
//       where: {
//         parentPlan1: {
//           plan_name: planName
//         },
//         MealSub: {
//           meal_type: mealType
//         },
//         TierSub: {
//           type: tier
//         }
//       },
//       include: {
//         FoodSubscription: {
//           include: {
//             FoodItems: true
//           }
//         }
//       }
//     });

//     const foodItems = meals.flatMap((meal) =>
//       meal.FoodSubscription.map((sub) => sub.FoodItems)
//     );

//     res.status(200).json({ success: true, foodItems });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error fetching meals" });
//   }
// };


const getMeals = async (req, res) => {
  try {
    const { planName, mealType, tier } = req.params;

    // Fetch subscriptions that match the criteria
    const subscriptions = await prisma.subscription.findMany({
      where: {
        parentPlan1: {
          plan_name: planName
        },
        MealSub: {
          meal_type: mealType
        },
        TierSub: {
          type: tier
        }
      },
      include: {
        FoodSubscription: {
          include: {
            FoodItems: true
          }
        }
      }
    });

    console.log("Fetched Subscriptions: ", JSON.stringify(subscriptions, null, 2));

    // Extract unique food items using a Set
    const foodItems = new Map();

    subscriptions.forEach((sub) => {
      sub.FoodSubscription.forEach((menu) => {
        foodItems.set(menu.FoodItems.id, menu.FoodItems);
      });
    });

    res.status(200).json({ success: true, foodItems: Array.from(foodItems.values()) });
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ success: false, message: "Error fetching meals." });
  }
};



 
 
const createSubscription = async (req, res) => {
  try {
    const {
      parent_plan_id,
      plan_description,
      duration_id,
      quantity_id,
      tier_id,
      meal_type_id,
      price_id,
    } = req.body;

    const createSubs = await prisma.subscription.create({
      data: {
        parent_plan_id,
        plan_description,
        tier_id,
        duration_id,
        quantity_id,
        meal_type_id,
        price_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    res
      .status(200)
      .json({ message: "Successfully created subscription", createSubs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
};

const sendNotificationOnSubscription = async (req, res, next) => {
  try {
    const entity_type = "Subscription";
    const { entity_id } = req.body;

    const { customer_id, user_id, email, username } = req.user;

    const subscriptionData = await prisma.subscription.findUnique({
      where: { id: entity_id },
      include: {
        SubscriptionPayments: true,
        parentPlan1: true,
        TierSub: true,
        DurationSub: true,
        DurationSubs: true,
        MealSub: true,
        PricingDetails: true,
      },
    });

    if (!subscriptionData) {
      return res.status(404).json({ msg: "Subscription not found" });
    }
    console.log("ss", subscriptionData)

    const startDate = new Date(subscriptionData.created_at);
    const actualDays = subscriptionData.DurationSubs.actual_days;

    const endDate = actualDays === 1 ? startDate : addDays(startDate, actualDays - 1);

    const formattedStartDate = format(startDate, "d MMM yyyy");
    const formattedEndDate = format(endDate, "d MMM yyyy");

    const notificationDescription = `You have successfully subscribed to the ${subscriptionData.parentPlan1.plan_name} plan with a ${subscriptionData.TierSub.type} tier. Your subscription includes a ${subscriptionData.MealSub.meal_type} meal for a duration of ${subscriptionData.DurationSubs.actual_days} days. The total price for this subscription is $${subscriptionData.PricingDetails.price}.`;

    const userAddress = await prisma.user_Address.findFirst({
      where: { customer_id: customer_id },
    });

    if (!userAddress.phone_number) {
      return res.status(404).json({ msg: "User's Phone Number not found" });
    }

    const whatsappNumber = userAddress.phone_number;

    await sendNotification({
      entity_type,
      entity_id,
      customer_id,
      user_id,
      email,
      notificationDescription,
      emailSubject: "Subscribed for Meal",
      emailTemplate: SubscriptionTemplateHTML(
        username,
        subscriptionData.parentPlan1.plan_name,
        formattedStartDate,
        formattedEndDate,
        "http://localhost:3000/user/IndividualPackBreakfastBudget",
        "http://localhost:3000/user/IndividualPackBreakfastBudget"
      ),
      whatsappNumber,
      whatsappMessage: notificationDescription,
    });
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getSubscriptionById,
  getSubscriptionNames,
  getSubscription,
  createSubscription,
  sendNotificationOnSubscription,
  getMeals
};
