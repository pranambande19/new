const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile',auth, userController.getProfile);  // <-- likely line 12
router.put('/profile', auth, userController.updateUserProfile); // <-- likely line 14
router.put('/profile-pic',auth, userController.upload ,userController.uploadProfilePic);
router.delete('/profile', auth, userController.removeProfilePic);



module.exports = router;
