const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');


router.post('/addItem', shopController.addItem);
router.get('/getAllItems', shopController.getAllItems);
router.get('/getAllCategories', shopController.getAllCategories);

module.exports = router;