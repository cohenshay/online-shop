const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authController = require('../controllers//authController');

router.post('/addItem', shopController.addItem);
router.get('/checkprivilage', authController.checkprivilage);

module.exports = router;