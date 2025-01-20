const express = require('express');
const { getAllSubscription, createSubscription, getSubscription, getSubscriptionNames } = require('../controllers/subscription.controllers');
const router = express.Router();

router.get('/getAllSub',getAllSubscription)
router.get('/names',getSubscriptionNames)
router.get('/getSUB',getSubscription)
router.post('/createSub',createSubscription)

module.exports = router;