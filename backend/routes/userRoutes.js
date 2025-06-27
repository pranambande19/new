// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');

// router.post('/signup', userController.signup);
// router.post('/login', userController.login);
// router.get('/profile',auth, userController.getProfile);  // <-- likely line 12
// router.put('/profile', auth, userController.updateUserProfile); // <-- likely line 14
// router.put('/profile-pic',auth, userController.upload ,userController.uploadProfilePic);
// router.delete('/profile', auth, userController.removeProfilePic);



// module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/cloudinaryUpload');

// Auth + Profile routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateUserProfile);

// ✅ Cloudinary upload
router.put('/profile-pic', auth, upload.single("profilePic"), userController.uploadProfilePic);

// Remove profile pic
router.put('/profilepic', auth, userController.removeProfilePic);

module.exports = router;
