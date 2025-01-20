const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllSubscription = async (req,res) => {
    try {
        const getSubs = await prisma.subscription.findMany()
        res.status(200).json({message : "All Subscription fetched",getSubs})
    } catch (error) {
       console.log(error)
       res.status(404).json({error : "No Subscriptions found"}) 
    }
}

const getSubscription = async (req,res) => {
try {
    const getSUB = await prisma.subscription.findMany({
        include : {
           parentPlan1 : true,
           SubscriptionPayments : true
        }
    })
    res.status(200).json({message : "Subscription found",getSUB})
} catch (error) {
    console.log(error)
    res.status(404).json({error : "Subscriptions not found "})
}
}

const getSubscriptionNames = async (req, res) => {
    try {
      const getSUB = await prisma.subscription.findMany({
        include: {
          parentPlan1: {select: { plan_name: true },},
          TierSub: { select: { type: true } },
          DurationSub: { select: { quantity: true } },
          DurationSubs : {select : {actual_days : true, addon_days : true}},
          MealSub: { select: { meal_type: true } },
          PricingDetails: { select: { price: true } },
        },
      });
  
      const groupedSubscriptions = getSUB.reduce((acc, sub) => {
        const key = `${sub.parentPlan1.plan_name} ${sub.TierSub.type}`;
        const mealType = sub.MealSub.meal_type;
  
        if (!acc[key]) {
          acc[key] = {};
        }
  
        if (!acc[key][mealType]) {
          acc[key][mealType] = [];
        }
  
        acc[key][mealType].push({
          id: sub.id,
          days: sub.DurationSubs.actual_days,
          price: sub.PricingDetails.price,
        });
  
        return acc;
      }, {});
  
      res.status(200).json({ message: "Subscription found", groupedSubscriptions });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Subscriptions not found" });
    }
  };
  

// const getSubscriptionNames = async (req, res) => {
//   try {
//       const { planName, tier, mealType } = req.query; 

//       const filterConditions = {};

//       if (planName) {
//           filterConditions.parentPlan1 = { plan_name: planName };
//       }
//       if (tier) {
//           filterConditions.TierSub = { type: tier };
//       }
//       if (mealType) {
//           filterConditions.MealSub = { meal_type: mealType };
//       }

//       const getSUB = await prisma.subscription.findMany({
//           where: filterConditions,
//           include: {
//               parentPlan1: {
//                   select: { plan_name: true },
//               },
//               TierSub: { select: { type: true } },
//               DurationSub: { select: { days: true } },
//               MealSub: { select: { meal_type: true } },
//               PricingDetails: { select: { price: true } },
//           },
//       });

//       const groupedSubscriptions = getSUB.reduce((acc, sub) => {
//           const key = `${sub.parentPlan1.plan_name} ${sub.TierSub.type}`;
//           const mealType = sub.MealSub.meal_type;

//           if (!acc[key]) {
//               acc[key] = {};
//           }

//           if (!acc[key][mealType]) {
//               acc[key][mealType] = [];
//           }

//           acc[key][mealType].push({
//               days: sub.DurationSub.days,
//               price: sub.PricingDetails.price,
//           });

//           return acc;
//       }, {});

//       res.status(200).json({ message: "Subscription found", groupedSubscriptions });
//   } catch (error) {
//       console.log(error);
//       res.status(404).json({ error: "Subscriptions not found" });
//   }
// };


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
  
      res.status(200).json({ message: "Successfully created subscription", createSubs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create subscription" });
    }
  };
  

module.exports={
    getAllSubscription,
    getSubscriptionNames,
    getSubscription,
    createSubscription
}