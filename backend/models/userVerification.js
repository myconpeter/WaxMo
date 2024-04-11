import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const userVerification = mongoose.Schema({
    userId: String,
    uniqueString: String,
    expiresAt: Date
}, { timestamps: true })

userVerification.pre('save', async function (next) {
    if (!this.isModified('uniqueString')) {
        next
    }

    const salt = await bcrypt.genSalt(12)
    this.uniqueString = await bcrypt.hash(this.uniqueString, salt)

})

const UserVerification = mongoose.model('UserVerification', userVerification)

export default UserVerification