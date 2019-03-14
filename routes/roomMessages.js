const express = require('express');
const router = express.Router();
const roomMessageController = require('../controllers/roomMessageController');


router.get('/getRoomMessages', roomMessageController.getRoomMessages);
router.post('/saveRoomMessage', roomMessageController.saveRoomMessage);
router.post('/saveLike', roomMessageController.saveLike);
router.get('/getLikes', roomMessageController.getLikes);


module.exports = router;