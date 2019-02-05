const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.post('/createRoom', roomController.createRoom );

router.get('/getRoom', roomController.getRoom );
 

module.exports = router;