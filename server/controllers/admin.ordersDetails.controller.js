const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrderDetails = async (req, res) => {
  try {
    const orders = await prisma.Orders.findMany({
      include: {
        OrdersCustomer: true,
        SubscriptionId: {
          include: {
            MealSub: true,
            FoodSubscription: {
              include: {
                FoodItems: true,
              },
            },
          },
        },
        orderedAddress: true,
        orderss: {
          include: {
            foodItems: true,
          },
        },
      },
    });

    const formattedOrders = await Promise.all (orders.map(async(order) => {

      const delivery = await prisma.Delivery.findFirst({
        where: {
          order_id: order.id,
        },
      });
      const subscriptionItems = order.SubscriptionId.FoodSubscription.map(
        (item) => ({
          id: item.FoodItems.id,
          name: item.FoodItems.item_name,
          type: item.FoodItems.item_type,
          description: item.FoodItems.description,
          image: item.FoodItems.image_url,
          from: "subscription",
        })
      );

      const orderedItems = order.orderss.map((item) => ({
        id: item.foodItems.id,
        name: item.foodItems.item_name,
        type: item.foodItems.item_type,
        description: item.foodItems.description,
        image: item.foodItems.image_url,
        quantity: item.quantity,
        from: "order",
      }));

      const allItems = [
        ...orderedItems,
        ...subscriptionItems.filter(
          (subItem) =>
            !orderedItems.some((ordItem) => ordItem.id === subItem.id)
        ),
      ];

      return {
        order_id: order.id,
        order_status: order.status,
        order_date: order.created_at,
        scheduled_delivery_date: order.ordered_date,
        customer: {
          id: order.OrdersCustomer.id,
          customer_id: order.OrdersCustomer.customer_id,
          name: order.OrdersCustomer.username,
          email: order.OrdersCustomer.email,
          phone: order.OrdersCustomer.phone_number,
          profile_picture: order.OrdersCustomer.display_picture,
        },
        subscription: {
          id: order.SubscriptionId.id,
          plan_description: order.SubscriptionId.plan_description,
          meal_type: {
            id: order.SubscriptionId.MealSub.id,
            name: order.SubscriptionId.MealSub.meal_type,
          },
          total_meals: order.total_meal,
        },
        delivery_details: {
          address_id: order.orderedAddress.id,
          recipient_name: order.orderedAddress.name,
          phone: order.orderedAddress.phone_number,
          alternate_phone: order.orderedAddress.alternate_number,
          image_url:order,
          full_address: [
            order.orderedAddress.street,
            order.orderedAddress.landmark,
            order.orderedAddress.city,
            order.orderedAddress.pincode,
          ]
            .filter(Boolean)
            .join(", "),
          special_instructions: order.orderedAddress.landmark,
        },
        items: allItems.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          description: item.description,
          image: item.image,
          quantity: item.quantity || 1,
          source: item.from,
        })),
        delivery,
        meta: {
          total_items: allItems.length,
          is_combo: order.SubscriptionId.MealSub.meal_type === "Combo",
          charges: order.charges,
        },
      };
    }));

    const ordersByMealType = formattedOrders.reduce((acc, order) => {
      const mealType = order.subscription.meal_type.name;
      if (!acc[mealType]) {
        acc[mealType] = [];
      }
      acc[mealType].push(order);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        grouped_by_meal_type: ordersByMealType,
        total_orders: formattedOrders.length,
      },
    });
  } catch (error) {
    console.error("Error fetching formatted orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

const verifyUserPosition = async (req, res) => {
  try {
    const userId = req.user.user_id; 

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prisma.user_Position.findMany({
      where: { user_id: userId }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isDelivery = user[0].position === "DELIVERY";

    return res.status(200).json({ 
      success: true, 
      isDelivery,
      message: isDelivery ? "User is in DELIVERY position" : "User is NOT in DELIVERY position"
    });

  } catch (error) {
    console.error("Error verifying user position:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status, customer_id, address_id, subscription_id } = req.body;
    const {user_id} = req.user;
    const image_url = req.file ? req.file.filename : null;


    const position = await prisma.User_Position.findMany({
      where: { user_id: user_id }
    });

    const userposition = position[0].position

    const validStatuses = {
      CHEF: ["PENDING", "PREPARING", "READY"],
      ADMIN: ["PENDING", "PREPARING", "READY"],
      DELIVERY: ["OUT_FOR_DELIVERY", "DELIVERED"]
    };

    if (!validStatuses[userposition]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition for ${userposition}`
      });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const updatedOrder = await prisma.Orders.update({
        where: { id: parseInt(order_id)  },
        data: {  status }
      });

      const subscription = await prisma.User_Subscription.findFirst({
        where: {
          customer_id: updatedOrder.customer_id,
        },
        orderBy: {
          created_at: 'desc', 
        },include: { userSubscriptionDetails: true }
      });

      if (status === "PREPARING" && (userposition === "CHEF" || userposition === "ADMIN")) {
        await prisma.Order_Response.createMany({
          data: [
            {
              status: "PENDING",
              address_id: parseInt(address_id),
              customer_id: subscription.user_id,
              delivery_user_id: 0,
              chef_id: user_id,
              order_id: parseInt(order_id),
              user_subscription_id: parseInt(subscription_id),
              customer_id:parseInt(customer_id)
            },
            {
              status: "PREPARING",
              address_id: parseInt(address_id),
              delivery_user_id: 0,
              chef_id: user_id,
              order_id: parseInt(order_id),
              user_subscription_id: parseInt(subscription_id),
              customer_id:parseInt(customer_id)
            }
          ]
        });
      }

      if (status === "READY" && (userposition === "CHEF" || userposition === "ADMIN")) {
        await prisma.Order_Response.createMany({
          data: [
            {
              status: "READY",
              address_id: parseInt(address_id),
              delivery_user_id: 0,
              chef_id: user_id,
              order_id: parseInt(order_id),
              user_subscription_id: parseInt(subscription_id),
              customer_id:parseInt(customer_id)
            },
            {
              status: "OUT_FOR_DELIVERY",
              address_id: parseInt(address_id),
              delivery_user_id: 0,
              chef_id: user_id,
              order_id: parseInt(order_id),
              user_subscription_id: parseInt(subscription_id),
              customer_id:parseInt(customer_id)
            }
          ]
        });
      }
      
      if (status === "DELIVERED") {
        await prisma.Delivery.createMany({
          data: {
            order_id: parseInt(order_id),
            delivery_user_id: user_id,
            customer_id: customer_id,
            delivery_status: "DELIVERED",
            delivery_response: "DELIVERED",
            image_url: image_url
          }
        });

        await prisma.Orders.update({
          where: { id: parseInt(order_id) },
          data: { status: "DELIVERED" }
        });

        await prisma.Order_Response.updateMany({
          where: {
            order_id: parseInt(order_id)
          },
          data: {
            delivery_user_id: user_id 
          }
        });

        await prisma.Order_Response.create({
          data: 
            {
              status: "DELIVERED",
              address_id: parseInt(address_id),
              delivery_user_id: user_id,
              chef_id: user_id,
              order_id: parseInt(order_id),
              user_subscription_id: parseInt(subscription_id),
              customer_id:parseInt(customer_id)
            }
        });
      }
    });

    res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
};


module.exports = { getOrderDetails,verifyUserPosition, updateOrderStatus};
