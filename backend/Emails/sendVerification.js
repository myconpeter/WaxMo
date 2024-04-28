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
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password Email</title>
            <style>
                /* Inline CSS styles */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    
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
                    border-radius: 5px;
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
                .hi{
                   
                    flex-direction: column;
                     justify-content: center;
                       
                      align-items: center;
                }
        
                .clickToReset{
                    
                    font-weight: 510;
                }
        
                
        
                .the{
                    margin-top: 10px;
                }
                .waxmo{
                    text-align: center;
                     margin: 0;
                      color: #044a0e;
                }
                .growth{
                    background-color: #044a0e;
                     color: white; 
                     text-align: center; 
                     padding: 5px 0;
                }
                .imgdiv{
                    display: flex; 
                    justify-content: center;
                    align-items:center;
                     margin: 10px;
                }
                .eachimg{
                    width: 15px;
                     height: 15px;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <div class="logo">
                    <a href="https://ibb.co/pXs6vJH"><img src="https://i.ibb.co/WKdNWgr/waxmo.jpg" style="height: 50px; width: 50px;" alt="waxmo" border="0"></a>   
                        </div>
        
                <div class="emailver">
                    <p style="text-align: center;">Verify Account</p>
                </div>
        
                <div class="hi">
                    <div>
                        <h4>Hi, ${firstName},</h4>
                        <p class="clickToReset">Thanks for registering on WaxMo please click to activate your account</p>
                    </div>
        
                    <a style="margin-right: 100px; text-decoration: none;" href="${activateLink}">
                        <div class="button">
                             Email Verification
                        </div>
                    </a>
        
                    <div>
                        <p class="questions">Got some questions or need help?</p>
                        <p  class="questions">Kindly reply this message to reach our support team</p>
                        <p  class="questions">Please ignore if you did not reset your password</p>
                    </div>
                </div>
        
        
                <div class="">
                    <p>Subscribe to our channels
        
                    <a  href="https://www.facebook.com/ThetallestboYOfficial"><img src="https://i.ibb.co/Bf5ZD4g/face.png" alt="face" border="0" style="text-decoration: none; width: 20px; height: 20px;" target="_blank"></a>
        
                    <a  href="https://chat.whatsapp.com/B966BJQfiSGDUbHNLbAPyx"><img  class="eachimg" src="https://i.ibb.co/LYd47Vt/what.jpg" alt="face" border="0" style="text-decoration: none;" target="_blank"></a>
        
                    <a  href="https://x.com/waxmo_/"><img  class="eachimg" src="https://i.ibb.co/RbT8KvM/x.jpg" alt="face" border="0" style="text-decoration: none;" target="_blank"></a>
        
        
                    </p>
                </div>
        
                <div class="the">
                    <h3 class="waxmo">WAXMO</h3>
                    <div class="growth">The path to financial growth</div>
                </div>
        
               
                <footer style="background-color: gray;r; padding-top: 20px;">
                Copyright &copy;
                <script>
                    document.write(new Date().getFullYear());
                </script> WaxMo Digitals Services
    
                <p>WaxMo is a financial technology investment company that diversify it investment in different portfolio. It issues shares to investors in return for dividend</p>
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