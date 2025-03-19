const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllMenu = async(req,res) => {
    try {
        const allMenu = await prisma.subscription_Food_Menu.findMany()
        res.status(200).json({message : "Success",allMenu})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No food menu fetched"})
    }
}

const getFoodMenuWithSubId = async(req,res) => {
    try {
        const{subscription_id}=req.body;
        
        const menuWithID = await prisma.subscription_Food_Menu.findMany({
            where : {subscription_id},
            select : {
                FoodItems : {
                    select : {
                        id : true,
                        item_name : true
                    }
                }
            }
        })
        res.status(200).json({message : "Success",menuWithID})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Menu found with this ID"})
    }
}

// const createMenu = async(req,res) => {
//     try {
//         const {subscription_id,food_item_id,meal_type_id} = req.body;
//         const newMenu = await prisma.subscription_Food_Menu.create({
//             data : {
                
//                 subscription_id,
//                 food_item_id,
//                 meal_type_id,
//                 created_at : new Date(),
//                 updatedAt : new Date()
//             }
//         })
//         res.status(200).json({message : "successfully created",newMenu})
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({error : "No menu is created"})
//     }
// }


const createMenu = async (req, res) => {
    try {
      const { subscription_id, food_item_ids, meal_type_id } = req.body;
  
      if (!subscription_id || !food_item_ids || !meal_type_id) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const menuEntries = food_item_ids.map((food_item_id) => ({
        subscription_id,
        food_item_id,
        meal_type_id,
        created_at: new Date(),
        updatedAt: new Date(),
      }));
  
      const newMenu = await prisma.subscription_Food_Menu.createMany({
        data: menuEntries,
      });
  
      res.status(201).json({ message: "Menu items added successfully!", newMenu });
    } catch (error) {
      console.error("Error creating menu:", error);
      res.status(500).json({ error: "Failed to add menu items." });
    }
  };
  


module.exports = {getAllMenu,getFoodMenuWithSubId,createMenu}