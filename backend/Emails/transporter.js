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
        pass: process.env.AUTH_PASSWORD
    }
});

// VERIFY TRANSPORTER
transporter.verify((error, success) => {
    error ? console.log('error') : console.log('success')
})

export default transporter