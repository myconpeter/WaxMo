import { v4 as uuidv4 } from 'uuid';
import UserVerification from '../models/userVerification.js'
import transporter from './transporter.js'

const sendVerification = async ({ _id, email }, res) => {
    const currentUrl = process.env.NODE_ENV === 'production' ? 'https://waxmo.onrender.com' : 'http://localhost:5000';
    const uniqueString = uuidv4() + _id
    const activateLink = `${currentUrl}/verify/${_id}/${uniqueString}`;


    // MAILOPTIONS
    const sendMailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: `Welcome to WaxMo`,
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
                        <h2>Welcome to Our Platform!</h2>
                        <p>Please confirm your email to activate your account.</p>
                        <a href="${activateLink}" class="button">Activate Account</a>
                    </div>
                </body>
            </html>
        `
    }

    const newVerification = await UserVerification.create({
        userId: _id,
        uniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3 * 60 * 60 * 1000
    })

    if (newVerification) {
        const sendMail = await transporter.sendMail(sendMailOptions)
        if (sendMail) {
            res.status(200).json({
                status: 'Pending',
                message: 'Check Your Mail'
            })

        } else {
            res.status(401)
            throw new Error('Mail Sending Failed')
        }
    } else {
        res.status(401)
        throw new Error('User Verification Creation Failed')
    }
}

export default sendVerification