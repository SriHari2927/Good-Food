const express = require('express')
const { getDuration, createDuration } = require('../controllers/duration.controllers')
const router = express.Router()

router.get('/getDays',getDuration)
router.post('/createDays',createDuration)

module.exports = router;