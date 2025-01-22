const { PrismaClient } = require('@prisma/client');
const express = require('express')
const prisma = new PrismaClient();


const getPhoneNumber = async (req,res) => {
    try {
      const getPhone = await prisma.user_Address.findMany()
      res.status(200).json(getPhone)  
    } catch (error) {
        console.log(error)
    }
}

const createPhoneNumber = async (req,res) => {
    try {
        const {name,email,phone_number,landmark,street,city,pincode}=req.body;
        const {customer_id} = req.user;
const createPhone = await prisma.user_Address.create({
    data : {
        customer_id,
        name,
        email,
        phone_number,
        landmark,
        street,
        city,
        pincode,
        created_at : new Date(),
        updatedAt : new Date()
    }
})
res.status(200).json({message : "Success",createPhone})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getPhoneNumber,createPhoneNumber}