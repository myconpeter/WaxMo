import asyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'
import UserVerification from '../models/userVerification.js'
import sendVerification from '../Emails/sendVerification.js'
import bcrypt from 'bcrypt'

// desc @register user / token not set
// route POST api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body


    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(401)
        throw new Error('This Account Already Exist')
    }
    const createdUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        verified: false
    })

    if (createdUser) {
        sendVerification(createdUser, res)
    } else {
        res.status(401)
        throw new Error('User Creation Failed')
    }

})

const verifyEmail = asyncHandler(async (req, res) => {
    const { userId, uniqueString } = req.params
    const verifiedLink = `http://localhost:3000/emailverified/:${userId}/:${uniqueString}`
    let message = ''
    const userVerification = await UserVerification.findOne({ userId })
    if (!userVerification) {
        message = 'Verification link not found'
        return res.redirect(`${verifiedLink}?error=true&message=${message}`)
    }
    const expiresAt = userVerification.expiresAt
    const hashedUniqueString = userVerification.uniqueString

    if (expiresAt < Date.now()) {
        const deleteExpiredVerification = await UserVerification.deleteOne({ userId })
        if (!deleteExpiredVerification) {
            message = 'Internal Error'
            return res.redirect(`${verifiedLink}?error=true&message=${message}`)
        }

        const deleteExpiredUser = await User.deleteOne({ userId })
        if (!deleteExpiredUser) {
            message = 'Internal Error'
            return res.redirect(`${verifiedLink}?error=true&message=${message}`)
        }
        message = 'Internal Error, Please register again'
        return res.redirect(`${verifiedLink}?error=true&message=${message}`)


    } else {
        //link not expires
        const compareUniqueString = await bcrypt.compare(uniqueString, hashedUniqueString)
        if (!compareUniqueString) {
            message = 'Internal Error, cannot process request, please check your mail'
            return res.redirect(`${verifiedLink}?error=true&message=${message}`)
        }
        const updateUserVerified = await User.updateOne({ _id: userId }, { verified: true })
        if (!updateUserVerified) {
            message = 'Internal Error'
            return res.redirect(`${verifiedLink}?error=true&message=${message}`)
        }
        const deleteUpdatedUserVerification = await UserVerification.deleteOne({ userId })
        if (!deleteUpdatedUserVerification) {
            message = 'Internal Error'
            return res.redirect(`${verifiedLink}?error=true&message=${message}`)
        }


        return res.redirect(verifiedLink)


    }


})





export {
    registerUser,
    verifyEmail
}