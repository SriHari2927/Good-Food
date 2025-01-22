
const express = require('express');
const { getUserSubscription, createUserSubscription,   getUserSubscriptionDetails, getSubscriptionDetailsById } = require('../controllers/userSubscription.controller');
const router = express.Router();
 
 
router.get('/getUserSubscription',getUserSubscription)
router.get('/getUserDetails',getUserSubscriptionDetails)
router.get('/subscriptions',getSubscriptionDetailsById)
router.post('/createUserSubscription',createUserSubscription)
 
module.exports = router;