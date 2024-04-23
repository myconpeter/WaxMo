import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// SETUP THE NODEMAILER
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
        name: process.env.EMAIL_NAME
    }
});

// VERIFY TRANSPORTER
transporter.verify((error, success) => {
    console.log(error ? 'transporter error' : 'transporter success')
})

export default transporter