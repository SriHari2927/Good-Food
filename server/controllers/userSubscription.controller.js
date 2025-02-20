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
const getMenuWithSubID = async (req, res) => {
  try {
    
    const { id } = req.params;
    const getFood = await prisma.user_Subscription.findMany({
      where: { id : parseInt(id) },
      select: {
        subscription_id : true,
        Subscription : {
          select : {
            FoodSubscription : {
              select : {
                FoodItems : {
                  select : {
                    item_name : true,
                    image_url:true
                  }
                }
              }
            }
          }
        }
      },
    });
    res.status(200).json({ message: "Fetched succsessfully", getFood });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "FAiled to fetch the food items" });
  }
};


module.exports = {
  getUserSubscription,
  getUserSubscriptionDetails,
  getMenuWithSubID,
};
