import { v4 as uuidv4 } from 'uuid';
import UserVerification from '../models/userVerification.js'
import transporter from './transporter.js'

const sendVerification = async ({ _id, email, firstName }, res) => {
    const currentUrl = process.env.NODE_ENV === 'production' ? 'https://waxmo.onrender.com' : 'http://localhost:5000';
    console.log(currentUrl)
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
                    padding: 0;
                    font-family: Arial, sans-serif;
                    border: 1px solid black;
                    border-radius: 10px;
                }
        
                .logo {
                    margin: auto;
                    width: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px;
                    background-color: black;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                }
        
                .button {
        
                    padding: 10px 12px;
                    background-color: #044a0e;
        
                    border-radius: 15px;
                    text-align: center;
                    color: white;
        
                    width: 130px;
        
                }
        
                .emailver {
                    color: white;
                    margin-top: 10px;
        
        
                    background-color: #044a0e;
                    display: inline-flex;
                    font-weight: bold;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 10px;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <div class="logo">
                    <img src=" https://waxmo.onrender.com/assets/logo-D17YjO0y.svg" alt="Company Logo" class="logo">
        
                </div>
        
                <div class="emailver">
                    <p>Account Verification</p>
                </div>
                <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
                    <div>
                        <h4>
                            Hi, ${firstName},
                        </h4>
                        <p style="text-align: center; font-weight: 510;">Thanks for registering on <span
                                style="color: #044a0e; font-weight: bold;">WaxMo</span> , Click
                            to verify </p>
                    </div>
        
                    <a href="${activateLink}">
                <div class="button">
                    Verify Account
                </div>
            </a>
        
                    <div>
                        <p style="text-align: center;">Got some questions or need help?</p>
                        <p style="text-align: center;">Kindly reply this message to reach our support team</p>
        
                        <p style="text-align: center;">If you didn't register, please ignore</p>
        
                    </div>
                </div>
        
                <div style="margin-top: 10px;">
                    <h3 style="text-align: center; margin: 0; color: #044a0e;">WAXMO</h3>
                    <div style="background-color: #044a0e; color: white; text-align: center; padding: 5px 0;">The path to
                        financial growth</div>
                </div>
        
                <div style="display: flex; justify-content: center; margin: 10px;">
                    <img style="width: 15px; height: 15px;"
                        src="data:image/jpeg;base64,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"
                        alt="facebook">
                    <img style="width: 15px; height: 15px;"
                        src="https://th.bing.com/th?id=OIP.TwESrblIhpd2D8XG5VDz5QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                        alt="whatsapp">
                </div>
        
                <footer style="background-color: gray; text-align: center; padding: 20px;">
                    Copyright &copy;
                    <script>document.write(new Date().getFullYear());</script> WaxMo Technologies
        
                    <p>WaxMo is a financial technology investment company</p>
                    <p>that diversify it investment in different portfolio. It issues</p>
                    <p>shares to investors in return for dividend</p>
        
                </footer>
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