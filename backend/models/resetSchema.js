import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const resetSchema = mongoose.Schema({
    userId: String,
    resetString: String,
    expiresAt: Date
}, { timestamps: true })

resetSchema.pre('save', async function (next) {
    if (!this.isModified('resetString')) {
        next
    }
    const salt = await bcrypt.genSalt(12)
    this.resetString = await bcrypt.hash(this.resetString, salt)
})

const ResetSchema = mongoose.model('ResetSchema', resetSchema)

export default ResetSchema