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
        res.status(400)
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
    const foundUserVerification = await UserVerification.findOne({ userId })
    if (foundUserVerification) {
        const expiresAt = foundUserVerification.expiresAt
        const hashedUniqueString = foundUserVerification.uniqueString

        if (expiresAt < Date.now()) {
            // VERIFICATION LINK EXPIRED
            const deleteExpiredVerification = await UserVerification.deleteOne({ userId })
            if (deleteExpiredVerification) {
                const deleteExpiredUser = await User.deleteOne({ userId })
                if (deleteExpiredUser) {
                    return res.send('PLEASE REGISTER AGAIN')

                } else {
                    return res.send('CANNOT DELETE EXPIRED USER, PLEASE REGISTER AGAIN')
                }

            } else {
                return res.send('CANNOT DELETE EXPIRED VERIFICATION')
            }
        } else {
            //VERIFICATION VALID
            const compareUniqueString = await bcrypt.compare(uniqueString, hashedUniqueString)
            if (compareUniqueString) {
                // THIS USER IS VERY VALID
                const updateUserVerified = await User.updateOne({ _id: userId }, { verified: true })
                if (updateUserVerified) {
                    const deleteUpdatedUserVerification = await UserVerification.deleteOne({ userId })
                    if (deleteUpdatedUserVerification) {
                        return res.send('ALL DONE YOU CAN NOW LOGIN')
                    } else {
                        return res.send('USER VERIFICATION NOT DELETED')
                    }

                } else {
                    return res.send('USER VERIFIED CANNOT BE UPDATED')
                }

            } else {
                // ILLEGAL UNIQUE STRING
                return res.send('YOU CANNOT COMPLETE THIS ACTIVITIES')
            }

        }


    } else {
        return res.send('LINK CANNOT BE FOUND, REGISTER AGAIN')
    }
})





export {
    registerUser,
    verifyEmail
}