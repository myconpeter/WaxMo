import User from '../models/userSchema.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt


    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decode.userId).select('-password')

            next()

        } catch (error) {
            res.status(401)
            throw new Error('Invalid Token')
        }

    } else {
        res.status(401)
        throw new Error('NOT AUTHORIZED')
    }
})

export {
    protect
}