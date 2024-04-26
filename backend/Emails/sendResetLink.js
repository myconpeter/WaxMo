import transporter from './transporter.js'
import ResetSchema from '../models/resetSchema.js'
import { v4 as uuidv4 } from 'uuid'

const sendResetLink = async ({ _id, email, firstName, lastName }, res) => {
    const currentUrl = process.env.NODE_ENV === 'production' ? 'https://waxmo.onrender.com' : 'http://localhost:5000';
    console.log(currentUrl)
    const resetString = uuidv4() + _id
    const activateLink = `${currentUrl}/verifyreset/${_id}/${resetString}`;

    const deleteAllPasswordLink = await ResetSchema.deleteMany({ userId: _id })
    console.log(deleteAllPasswordLink)
    if (!deleteAllPasswordLink) {
        res.status(401)
        throw new Error('cannot delete all password in db')
    }


    const sendResetOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: `Reset Password`,
        html: `
            <html>
                <head>
                    <style>
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            font-family: Arial, sans-serif;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                        }
                        .logo {
                            display: block;
                            margin: 0 auto;
                            width: 200px;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img src="https://th.bing.com/th?id=ORMS.74c6b9abdf846c014d655f55151c47bb&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0" alt="Company Logo" class="logo">
                        <h2>Reset Password!</h2>
                        <p>Please click this link to reset your password.</p>
                        <a href="${activateLink}" class="button">Reset password</a>
                    </div>
                </body>
            </html>
        `
    }



    const newResetLink = await ResetSchema.create({
        userId: _id,
        resetString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000
    })

    if (!newResetLink) {
        throw new Error('Reset Link not generated')
    }
    const sendResetLink = await transporter.sendMail(sendResetOptions)
    if (!sendResetLink) {
        throw new Error('Reset mail not found')
    }
    res.json({
        subject: 'mail sent'
    })
}


export default sendResetLink