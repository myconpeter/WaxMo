import express from 'express'

// sign up controllers
import { registerUser } from '../controllers/signUpController.js'

// user controllers
import { loginUser, logoutUser } from '../controllers/userController.js'

import { protect } from '../middlewares/authMiddleware.js'

// reset password controllers
import { handleEmail, changePassword } from '../controllers/resetController.js'

// update controllers
import { updateName, nameEdit, updatePassword, passwordUpdated, updateMobile, mobileUpdated, bankDetails, bankDetailsChanged } from '../controllers/userController.js'


const router = express.Router()


// register user route
router.post('/register', registerUser)
// router.get('/verify/:userId/uniqueString', verifyEmail)

// login user route
router.post('/login', loginUser)

// logout User
router.post('/logout', logoutUser)

// here are the reset routes 

router.post('/resetEmail', handleEmail)
router.post('/changePassword', changePassword)


// UPDATE ROUTE HANDLER
router.get('/updateName', protect, updateName)
router.put('/updateName', protect, nameEdit)

router.route('/updatePassword').get(protect, updatePassword).put(protect, passwordUpdated)
router.route('/updateMobile').get(protect, updateMobile).put(protect, mobileUpdated)
router.route('/updateBank').get(protect, bankDetails).put(protect, bankDetailsChanged)


export default router

