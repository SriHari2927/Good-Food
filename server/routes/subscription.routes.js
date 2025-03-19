const express = require('express');
const {  createSubscription, getSubscription, getSubscriptionNames, getSubscriptionById, sendNotificationOnSubscription, getMeals } = require('../controllers/subscription.controllers');
const router = express.Router();

router.get('/subscriptions/:id',getSubscriptionById)
router.get('/getSUB',getSubscription)
router.get('/names',getSubscriptionNames)
router.post('/createSub',createSubscription);
router.get('/getMeal/:planName/:mealType/:tier',getMeals)


// SEND EMAIL ON SUCESSFULL SUBSCRIPTION
// METHOD : GET
router.get("/sendNotificationOnSubscription", sendNotificationOnSubscription);

module.exports = router;

