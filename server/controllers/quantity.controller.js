const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getQuantity = async(req,res) => {
    try {
        const getQty = await prisma.quantity.findMany()
        res.status(400).json({message : "Success",getQty})
    } catch (error) {
        console.log(error)
        resizeBy.status(404).json({error : "Quantity not available "})
    }
}

const createQuantity = async(req,res) => {
    try {
        const{quantity} = req.body
       const newQty = await prisma.quantity.create({
        data : {
            quantity,
            created_at : new Date(),
            updatedAt : new Date()
        }
       }) 
       res.status(200).json({message : "Days Added",newQty})
    } catch (error) {
       console.log(error)
       res.status(404).json({error : "No days added "}) 
    }
}


module.exports = {getQuantity,createQuantity}