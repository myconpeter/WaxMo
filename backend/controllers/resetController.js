import asyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'
import sendResetLink from '../Emails/sendResetLink.js'
import ResetSchema from '../models/resetSchema.js'
import bcrypt from 'bcrypt'


const handleEmail = asyncHandler(async (req, res) => {
    const { email } = req.body
    const searchUser = await User.findOne({ email })
    if (!searchUser) {
        res.status(401)
        throw new Error('Email Address not found')
    }
    if (!searchUser.verified) {
        res.status(401)
        throw new Error('This Account as not been verified')
    }
    sendResetLink(searchUser, res)
})


const verifyResetLink = asyncHandler(async (req, res) => {
    const { userId, resetString } = req.params
    const redirectLink = `https://waxmo.onrender.com/changepassword/${userId}/${resetString}`

    const foundResetString = await ResetSchema.findOne({ userId })
    if (!foundResetString) {
        let message = 'Invalid Credentials'
        return res.redirect(`${redirectLink}?error=true&message=${message}`)
    }
    const expiresAt = foundResetString.expiresAt
    const hashedResetString = foundResetString.resetString

    if (expiresAt < Date.now()) {
        const deleteExpiredLink = await ResetSchema.deleteOne({ userId })
        if (deleteExpiredLink) {
            let message = 'This Link has expired . Please reset  your password again.'
            return res.redirect(`${redirectLink}?error=true&message=${message}`)
        } else {
            let message = 'Invalid Credentials'
            return res.redirect(`${redirectLink}?error=true&message=${message}`)
        }
    } else {
        const compareResetLink = await bcrypt.compare(resetString, hashedResetString)
        if (!compareResetLink) {
            let message = 'Invalid Credentials'
            return res.redirect(`${redirectLink}?error=true&message=${message}`)
        }
        return res.redirect(redirectLink)
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { userId, resetString, password, confirmPassword } = req.body
    const correctResetLink = await ResetSchema.findOne({ userId })
    if (!correctResetLink) {
        res.status(401)
        throw new Error('not oo available')
    }
    if (correctResetLink.expiresAt < Date.now()) {
        const deleteExpiredResetLink = await ResetSchema.deleteOne({ userId })
        if (!deleteExpiredResetLink) {
            res.status(401)
            throw new Error('cannot delete link')
        }

        return res.send('link don expire')
    } else {
        const compareResetString = await bcrypt.compare(resetString, correctResetLink.resetString)
        if (!compareResetString) {
            return res.send('scammer alert')
        }
        if (password != confirmPassword) {
            res.status(401)
            throw new Error('not same password')
        }

        const userToUpdate = await User.findOne({ _id: userId })
        if (!userToUpdate) {
            res.status(401)
            throw new Error('no user found')
        }
        userToUpdate.password = password
        const saveUpdatedPassword = await userToUpdate.save()
        if (!saveUpdatedPassword) {
            res.status(401)
            throw new Error('user not saved')
        }
        const deleteResetLink = await ResetSchema.deleteOne({ userId })
        if (!deleteResetLink) {
            res.status(401)
            throw new Error('reset link !deleted')
        }
        res.status(200).json({
            saveUpdatedPassword
        })

    }

})




export {
    handleEmail,
    verifyResetLink,
    changePassword


}