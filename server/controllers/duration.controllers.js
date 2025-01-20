const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const getDuration = async(req,res) => {
    try {
       const getDays = await prisma.duration.findMany()
       res.status(200).json({message : "Duration fetched",getDays}) 
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No duration fetched"})
    }
}


const createDuration = async(req,res) => {
    try {
        const {actual_days,addon_days} = req.body;
        const newDuration = await prisma.duration.create({
            data : {
                actual_days,
                addon_days,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Days created",newDuration})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "Can't create duration"})
    }
}


module.exports = {getDuration,createDuration}