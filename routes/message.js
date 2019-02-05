const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


router.post('/saveRoomMessage', messageController.saveRoomMessage );
router.get('/getPrivateMessages', messageController.getPrivateMessages );
router.get('/getRoomMessages', messageController.getRoomMessages );
 

module.exports = router;