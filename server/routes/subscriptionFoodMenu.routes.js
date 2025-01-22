const express = require('express')
const { getAllMenu, createMenu } = require('../controllers/subscriptionFoodMenu.controller')
const router = express.Router()


router.get('/getAllMenu',getAllMenu)
router.post('/createMenu',createMenu)

module.exports = router;