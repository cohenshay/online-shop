const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');


router.post('/addItem', shopController.addItem);


module.exports = router;