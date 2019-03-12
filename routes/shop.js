const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');



router.get('/getAllItems', shopController.getAllItems);
router.get('/getAllCategories', shopController.getAllCategories);
router.get('/category', shopController.getTypesByCategory);
router.post('/filterTypes', shopController.filterTypes);
module.exports = router;