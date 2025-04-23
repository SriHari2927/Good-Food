const express=require('express')
const { createPeriodical, createDailyMenu,  getAllMenu,  getPeriodical, setActiveDailyMenu, deleteDailyMenu, getActiveDailyMenu, getDailyMenu, getOneDailyMenu, updateDailyMenu, getUnifiedDailyMenu, getUserDailyMenu } = require('../controllers/daily_menu.controller')
const router = express.Router()

router.post('/createPeriod',createPeriodical)
router.get('/getPeriod',getPeriodical)

router.post('/createDaily',createDailyMenu)
router.get("/getDaily",getDailyMenu)

router.get('/All',getAllMenu)


router.post("/setActive", setActiveDailyMenu);
router.delete("/delete/:period_id", deleteDailyMenu);
router.get("/activeMenu", getActiveDailyMenu);
router.get('/getUnified',getUnifiedDailyMenu)
router.get('/userMenu',getUserDailyMenu)


router.get('/getOne',getOneDailyMenu)
router.get('/updateDaily',updateDailyMenu)


module.exports=router; 