const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');


router.post('/', contactUsController.email);


 

module.exports = router;