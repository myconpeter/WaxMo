import mongoose from 'mongoose'
import bcrypt, { genSalt } from 'bcrypt'


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {
        type: String
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    isAnInvestor: {
        type: Boolean,
        default: false
    },
    currentAmount: {
        type: Number,
        default: 0
    },

    accountNameUpdated: {
        type: Boolean,
        default: false
    },
    bankAccountName: {
        type: String,
    },
    bankAccountNumber: {
        type: String,
    },
    bankBankName: {
        type: String
    },
    isBankChanged: {
        type: Boolean,
        default: false
    },


    verified: Boolean


}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.matchPassword = async function (enteredPassword) {
    const comparePassword = await bcrypt.compare(enteredPassword, this.password)
    return comparePassword ? this.password : null
}

const User = mongoose.model('User', userSchema)

export default User