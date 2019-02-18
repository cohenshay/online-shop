const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


//router.post('/createRoom', roomController.createRoom );

router.get('/getRooms', roomController.getRooms );
 

module.exports = router;