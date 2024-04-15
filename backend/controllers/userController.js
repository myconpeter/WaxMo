import asyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'
import generatePassword from '../utility/generateToken.js'


// desc @login user / token set
// route POST api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        if (user.verified) {
            // set the token here
            generatePassword(res, user.id)
            res.status(201).json({
                ...user._doc,
            })
        } else {
            res.status(401)
            throw new Error('Please Verify Email')
        }
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// desc @logout user / token destroy
// route POST api/users/logout
//@access private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.json({
        message: 'Logout Successful'
    }).status(200)
})

export {
    loginUser,
    logoutUser
}



