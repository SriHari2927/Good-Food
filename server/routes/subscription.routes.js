const express = require('express');
const {  createSubscription, getSubscription, getSubscriptionNames, getSubscriptionById,   getMealsWithDailyMenu, getGroupedMenu, getMenuBySubscriptionAndPeriod } = require('../controllers/subscription.controllers');
const router = express.Router();
 
router.get('/subscriptions/:id',getSubscriptionById)
router.get('/getSUB',getSubscription)
router.get('/names',getSubscriptionNames)
router.post('/createSub',createSubscription);
router.get('/getMeal/:planName/:mealType/:tier',getMealsWithDailyMenu)
router.get('/menu/:planName/:tier/:mealType',getGroupedMenu)
router.get('/getDailyy',getMenuBySubscriptionAndPeriod)

 
module.exports = router;
