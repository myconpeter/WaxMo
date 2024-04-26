import asyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'
import generateToken from '../utility/generateToken.js'
import bcrypt from 'bcrypt'


// desc @login user / token set
// route POST api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        if (user.verified) {
            // set the token here
            generateToken(res, user._id)
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


// desc @update user 
// route POST api/users/updatename
//@access private

const updateName = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,

    }

    res.json(user).status(200)

})

const nameEdit = asyncHandler(async (req, res) => {
    const { firstName, lastName, password } = req.body
    const pass = await User.findOne(req.user._id)
    const user = await User.findById(req.user._id)
    const hashedPassword = user.password
    if (!user) {
        res.status(401)
        throw new Error('Internal Server Error')
    }
    const comparePassword = await bcrypt.compare(password, hashedPassword)
    console.log(password, hashedPassword, comparePassword)
    if (!comparePassword) {
        res.status(401)
        throw new Error('Incorrect Password')
    }
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.password = password
    user.accountNameUpdated = true
    const saveUser = await user.save()
    if (!saveUser) {
        res.status(401)
        throw new Error('Internal Server Error')
    }
    res.status(200).json(saveUser);
})


const updatePassword = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
    }
    res.json(user).status(200)
})

const passwordUpdated = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body
    const user = await User.findOne(req.user._id)
    const hashedPassword = user.password
    if (!user) {
        res.status(401)
        throw new Error('Internal Server Error')
    }

    const comparePassword = await bcrypt.compare(oldPassword, hashedPassword)
    if (!comparePassword) {
        res.status(401)
        throw new Error('Incorrect Password')
    }
    user.password = newPassword || user.password

    const saveUser = await user.save()
    if (!saveUser) {
        res.status(401)
        throw new Error('Internal Server Error')
    }

    res.status(200).json(saveUser);
})


const updateMobile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        phoneNumber: req.user.phoneNumber
    }
    console.log(user)
    res.json(user).status(200)

})

const mobileUpdated = asyncHandler(async (req, res) => {
    const { oldMobile, newMobile, password } = req.body
    const pass = await User.findOne(req.user._id)
    const user = await User.findById(req.user._id)
    const hashedPassword = user.password
    if (!user) {
        res.status(401)
        throw new Error('Internal Server Error')
    }
    const comparePassword = await bcrypt.compare(password, hashedPassword)
    if (!comparePassword) {
        res.status(401)
        throw new Error('Incorrect Password')
    }
    user.phoneNumber = newMobile || user.phoneNumber
    user.password = password
    const saveUser = await user.save()
    if (!saveUser) {
        res.status(401)
        throw new Error('Internal Server Error')
    }
    res.status(200).json(saveUser);
})



const bankDetails = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        bankAccountNumber: req.user.bankAccountNumber,
        bankBankName: req.user.bankBankName,
        bankAccountName: req.user.bankAccountName,
        isBankChanged: req.user.isBankChanged
    }
    res.json(user).status(200)

})

const bankDetailsChanged = asyncHandler(async (req, res) => {
    const { bankAccountNumber, bankBankName, bankAccountName, password } = req.body;
    const userId = req.user._id;

    try {
        // Fetch the user document by ID
        const user = await User.findById(userId);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update only the bank details, keeping the rest of the user object intact
        user.bankAccountNumber = bankAccountNumber || user.bankAccountNumber;
        user.bankBankName = bankBankName || user.bankBankName;
        user.bankAccountName = bankAccountName || user.bankAccountName;
        user.isBankChanged = true;



        // Save the updated user document
        const updatedUser = await user.save();


        // Return the updated user details
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





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
    logoutUser,
    updateName,
    nameEdit,
    updatePassword,
    passwordUpdated,
    updateMobile,
    mobileUpdated,
    bankDetailsChanged,
    bankDetails
}



