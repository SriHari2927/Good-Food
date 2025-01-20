const express = require('express');
const { getUserSubscription, createUserSubscription, getUserSubscriptionDetails, getSubscriptionById } = require('../controllers/userSubscription.controller');
const router = express.Router();


router.get('/getUserSubscription',getUserSubscription)
router.get('/getUserDetails',getUserSubscriptionDetails)
router.get('/subscriptions/:id',getSubscriptionById)
router.post('/createUserSubscription',createUserSubscription)

module.exports = router;