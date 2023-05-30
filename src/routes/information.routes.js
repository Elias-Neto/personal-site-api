const express = require('express')
const router = express.Router()

const informationController = require('../controllers/informationController')

router.get('/1', informationController.getInformation)
router.put('/1', informationController.updateInformation)

module.exports = router