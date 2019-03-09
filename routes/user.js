const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post('/getUserMessages', userController.getUserMessages);
module.exports = router;