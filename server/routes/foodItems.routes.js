const express = require('express');
const { getAllFoodItems, createFoodItems } = require('../controllers/foodItems.controllers');
const router = express.Router();

router.get('/getFood',getAllFoodItems)
router.post('/newFood',createFoodItems)

module.exports = router;
