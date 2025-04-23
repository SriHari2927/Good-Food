require("dotenv").config();
const Razorpay = require("razorpay");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// const createOrderAndSubscription = async (req, res) => {
//   try {
//     const { amount, subscription_id } = req.body;

//     if (!amount || !subscription_id) {
//       return res.status(400).json({ error: "Amount and subscription_id are required" });
//     }

//     const orderOptions = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     let order;
//     try {
//       order = await razorpay.orders.create(orderOptions);
//       if (!order || !order.id) {
//         throw new Error("Failed to create Razorpay order");
//       }
//     } catch (err) {
//       console.error("Razorpay order creation error:", err);
//       return res.status(500).json({ error: "Failed to create Razorpay order" });
//     }

//     const { customer_id,user_id } = req.user;

//     const subscription = await prisma.subscription.findUnique({
//       where: { id: Number(subscription_id) },
//     });

//     if (!subscription) {
//       return res.status(404).json({ error: "Subscription not found" });
//     }

//     const subscriptionData = await prisma.subscription.findUnique({
//       where: { id: subscription.id },
//       include: {
//         DurationSub: { select: { quantity: true } },
//         DurationSubs: { select: { actual_days: true, addon_days: true } },
//         MealSub: { select: { meal_type: true } },
//         PricingDetails: { select: { price: true } },
//       },
//     });

//     if (!subscriptionData) {
//       return res.status(404).json({ error: "Subscription details not found" });
//     }

//     const quantity = subscriptionData.DurationSub?.quantity || 0;
//     const actual_days = subscriptionData.DurationSubs?.actual_days || 0;
//     const addon_days = subscriptionData.DurationSubs?.addon_days || 0;
//     const validity = actual_days + addon_days;

//     const start_date = new Date();
//     start_date.setDate(start_date.getDate() + 1);
//     const end_date = new Date(start_date);
//     end_date.setDate(start_date.getDate() + quantity-1);

    
// const mealType = subscriptionData.MealSub?.meal_type || "";

// let breakfast_qty = 0;
// let lunch_qty = 0;
// let dinner_qty = 0;

// if (mealType === "Breakfast") {
//   breakfast_qty = 1;
// } else if (mealType === "Lunch") {
//   lunch_qty = 1;
// } else if (mealType === "Dinner") {
//   dinner_qty = 1;
// } else if (mealType === "Combo") {
//   breakfast_qty = 1;
//   lunch_qty = 1;
//   dinner_qty = 1;
// }

//     const userSubscription = await prisma.user_Subscription.create({
//       data: {
//         subscription_id: subscription.id,
//         start_date,
//         end_date,
//         status: "Pending",
//         customer_id,
//         validity_days: validity,
//         created_at: new Date(),
//         updatedAt: new Date(),
//         userSubscriptionFood: {
//           create: {
//             ordered_date:new Date(),
//             breakfast_qty,
//             lunch_qty,
//             dinner_qty,
//             customer_id,
//             user_id,
//             created_at:new Date(),
//             updatedAt:new Date()
//           }
//         }
//       },
//     });

//     const menuData = await prisma.subscription.findUnique({
//       where: { id: subscription.id },
//       include: {
//         ParentPlan: true,
//         MealSub: true,
//         TierSub: true
//       }
//     });
    
//     const { parent_plan_id } = menuData;
//     const meal_type = menuData.MealSub?.meal_type;
//     const tier_id = menuData.tier_id;
    
//     const dailyMenu = await prisma.daily_Menu.findMany({
//       where: {
//         parent_plan_id,
//         isDaily: "Active"
//       },
//       include: {
//         Periodical: true,
//         Subscription_Food_Menu: {
//           where: {
//             meal_type,
//             tier_id
//           },
//           include: {
//             Food: true
//           }
//         }
//       }
//     });
    
//     console.log("User Subscription Created:", userSubscription);

//     res.status(200).json({
//       message: "Order created and subscription activated",
//       order,
//       subscription: userSubscription,
//       dailyMenu
//     });
    

//   } catch (error) {
//     console.error("Error processing payment and subscription:", error.message || error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const createOrderAndSubscription = async (req, res) => {
  try {
    const { amount, subscription_id } = req.body;

    if (!amount || !subscription_id) {
      return res.status(400).json({ error: "Amount and subscription_id are required" });
    }

    const orderOptions = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    let order;
    try {
      order = await razorpay.orders.create(orderOptions);
      if (!order?.id) throw new Error("Failed to create Razorpay order");
    } catch (err) {
      console.error("Razorpay order creation error:", err);
      return res.status(500).json({ error: "Failed to create Razorpay order" });
    }

    const { customer_id, user_id } = req.user;

    const subscription = await prisma.subscription.findUnique({
      where: { id: Number(subscription_id) },
    });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const subscriptionData = await prisma.subscription.findUnique({
      where: { id: subscription.id },
      include: {
        DurationSub: { select: { quantity: true } },
        DurationSubs: { select: { actual_days: true, addon_days: true } },
        MealSub: { select: { meal_type: true } },
        PricingDetails: { select: { price: true } },
      },
    });

    const quantity = subscriptionData.DurationSub?.quantity || 0;
    const actual_days = subscriptionData.DurationSubs?.actual_days || 0;
    const addon_days = subscriptionData.DurationSubs?.addon_days || 0;
    const validity = actual_days + addon_days;

    const start_date = new Date();
    start_date.setDate(start_date.getDate() + 1);
    const end_date = new Date(start_date);
    end_date.setDate(start_date.getDate() + quantity - 1);

    const mealType = subscriptionData.MealSub?.meal_type || "";
    let breakfast_qty = 0, lunch_qty = 0, dinner_qty = 0;

    if (mealType === "Breakfast") breakfast_qty = 1;
    else if (mealType === "Lunch") lunch_qty = 1;
    else if (mealType === "Dinner") dinner_qty = 1;
    else if (mealType === "Combo") {
      breakfast_qty = 1;
      lunch_qty = 1;
      dinner_qty = 1;
    }

    const userSubscription = await prisma.user_Subscription.create({
      data: {
        subscription_id: subscription.id,
        start_date,
        end_date,
        status: "Pending",
        customer_id,
        validity_days: validity,
        userSubscriptionFood: {
          create: {
            ordered_date: new Date(),
            breakfast_qty,
            lunch_qty,
            dinner_qty,
            customer_id,
            user_id,
          },
        },
      },
    });

    const menuData = await prisma.subscription.findUnique({
      where: { id: subscription.id },
      include: {
        parentPlan1: true,
        MealSub: true,
        TierSub: true,
      },
    });

    const parent_plan_id = menuData?.parent_plan_id;
    

    const dailyMenu = await prisma.daily_Menu.findMany({
      where: {
        parent_plan_id,
        isDaily: true, 
      },
      select: {
        periods: true,
        subFoodMenuu: {
          select: {
           FoodSubscription : {
            select : {
              MealSub : {
                select : {
                  id : true,
                  meal_type:true
                }
              },
              TierSub : {
                select : {
                  id : true,
                  type:true
                }
              }
            }
            
           },
           FoodItems : {
            select : {
              id:true,
              item_name:true,
              image_url:true
            }
           }
          },
          
        },

        
      },
    });

    console.log("User Subscription Created:", userSubscription);

    res.status(200).json({
      message: "Order created and subscription activated",
      order,
      subscription: userSubscription,
      dailyMenu,
    });
  } catch (error) {
    console.error("Error processing payment and subscription:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updatePaymentStatus = async (req, res) => {
  try {
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKey || !razorpaySecret) {
      return res.status(500).json({ error: "Razorpay credentials are missing" });
    }

    const auth = `Basic ${Buffer.from(`${razorpayKey}:${razorpaySecret}`).toString("base64")}`;

    const { payment_id, order_id, subscription_id, payment_status, payment_info } = req.body;
    const { customer_id } = req.user;

    if (!payment_id || !order_id || !subscription_id || !customer_id || !payment_status || !payment_info) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify Razorpay payment
    const response = await axios.get(`https://api.razorpay.com/v1/payments/${payment_id}`, {
      headers: { Authorization: auth },
    });

    const paymentDetails = response.data;
    console.log("Payment Details:", paymentDetails);

    const paymentMethod =
      paymentDetails.method === "wallet"
        ? paymentDetails.wallet
        : paymentDetails.method === "upi"
        ? paymentDetails.vpa
        : paymentDetails.method === "card"
        ? `${paymentDetails.method} - ${paymentDetails.bank}`
        : paymentDetails.method;

    console.log("Payment Method:", paymentMethod);

    // Fetch User Subscription
    const userSubscription = await prisma.user_Subscription.findFirst({
      where: { subscription_id: Number(subscription_id), customer_id },
    });

    if (!userSubscription) {
      return res.status(404).json({ error: "User Subscription not found" });
    }

    // Save payment details to Subscription_Payment table
    const subscriptionPayment = await prisma.subscription_Payment.create({
      data: {
        payment_method: paymentMethod,
        subscription_id: Number(subscription_id),
        customer_id,
        payment_status,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("Subscription Payment:", subscriptionPayment);

    // If payment is captured, activate subscription
    if (payment_status === "captured") {
      await prisma.user_Subscription.update({
        where: { id: userSubscription.id },
        data: { status: "Active", updatedAt: new Date() },
      });
    }

    res.status(200).json({
      message: "Payment details updated successfully",
      subscriptionPayment,
    });

  } catch (error) {
    console.error("Error updating payment details:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getKey = async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

const getPaymentDetails = async (req, res) => {
  try {
    const { payment_id } = req.params;

    const paymentDetails = await prisma.subscription_Payment.findUnique({
      where: { id: Number(payment_id) },
    });

    if (!paymentDetails) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(paymentDetails);

  } catch (error) {
    console.error("Error fetching payment details:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createOrderAndSubscription, getKey, updatePaymentStatus, getPaymentDetails };








