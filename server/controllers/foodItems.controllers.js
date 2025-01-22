const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFoodItems = async(req,res)=> {
try {
    const getFood = await prisma.food_Items.findMany()
    res.status(200).json({message : "Successfully fetched all food items",getFood})
} catch (error) {
   console.log(error)
   res.status(404).json({error : "No food items fetched"}) 
}
}

const createFoodItems = async(req,res) => {
    try {
        const {item_name,item_type,description,price_id,image_url} = req.body

        


       const newFood = await prisma.food_Items.create({
        data : {
            item_name,
            item_type,
            description,
            price_id,
            image_url,
            created_at : new Date(),
            updatedAt: new Date()
        }
       })
        res.status(200).json({message : "Food Item created",newFood})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No food items added "})
    }
}


module.exports = {getAllFoodItems,createFoodItems}