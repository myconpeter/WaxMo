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
        throw new Error('Email not found')
    }
    if (!searchUser.verified === true) {
        res.status(401)
        throw new Error('This Account as not been verified')
    }
    sendResetLink(searchUser, res)
})


const verifyResetLink = asyncHandler(async (req, res) => {
    const { userId, resetString } = req.params
    console.log(userId, resetString)
    const foundResetString = await ResetSchema.findOne({ userId })
    if (!foundResetString) {
        return res.send('reset not found')
    }
    const expiresAt = foundResetString.expiresAt
    const hashedResetString = foundResetString.resetString

    if (expiresAt < Date.now()) {
        const deleteExpiredLink = await ResetSchema.deleteOne({ userId })
        if (deleteExpiredLink) {
            return res.send('please reset again')
        } else {
            return res.send('resetlink not deleted')
        }
    } else {
        const compareResetLink = await bcrypt.compare(resetString, hashedResetString)
        if (!compareResetLink) {
            return res.send('scammer alert')
        }
        return res.send('form here')
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { userId, resetString, password, confirmPassword } = req.body
    const correctResetLink = await ResetSchema.findOne({ userId })
    if (!correctResetLink) {
        return res.send('invalid link')
    }
    if (correctResetLink.expiresAt < Date.now()) {
        const deleteExpiredResetLink = await ResetSchema.deleteOne({ userId })
        if (!deleteExpiredResetLink) {
            return res.send('cannot delete link')
        }

        return res.send('link don expire')
    } else {
        const compareResetString = await bcrypt.compare(resetString, correctResetLink.resetString)
        if (!compareResetString) {
            return res.send('scammer alert')
        }
        if (password !== confirmPassword) {
            res.send('not same password')
        }

        const userToUpdate = await User.findOne({ _id: userId })
        if (!userToUpdate) {
            return res.send('no user found')
        }
        userToUpdate.password = password
        const saveUpdatedPassword = await userToUpdate.save()
        if (!saveUpdatedPassword) {
            res.send('user not saved')
        }
        const deleteResetLink = await ResetSchema.deleteOne({ userId })
        if (!deleteResetLink) {
            res.send('reset link !deleted')
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