import express from 'express'

// sign up controllers
import { registerUser, verifyEmail } from '../controllers/signUpController.js'

// user controllers
import { loginUser, logoutUser } from '../controllers/userController.js'

import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()


// register user route
router.post('/register', registerUser)
// router.get('/verify/:userId/uniqueString', verifyEmail)

// login user route
router.post('/login', loginUser)

// logout User
router.post('/logout', logoutUser)


export default router

