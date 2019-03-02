const express = require('express');
const router = express.Router();
const messageController = require('../controllers/privateMessageController');


router.get('/getConversation', messageController.getConversation );
router.post('/savePrivateMessage', messageController.savePrivateMessage );
 

module.exports = router;