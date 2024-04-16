import express from 'express'

// sign up controllers
import { registerUser, verifyEmail } from '../controllers/signUpController.js'

// user controllers
import { loginUser, logoutUser } from '../controllers/userController.js'

import { protect } from '../middlewares/authMiddleware.js'

// reset password controllers
import { handleEmail, changePassword } from '../controllers/resetController.js'


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


export default router

