const express = require('express');
const { getQuantity, createQuantity } = require('../controllers/quantity.controller');
const router = express.Router()
 
 
router.get('/getQuantity',getQuantity)
router.post('/createQuantity',createQuantity)
 
module.exports = router;