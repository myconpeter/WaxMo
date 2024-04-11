import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'


// ROUTES
import userRoutes from './routes/userRoutes.js'


// MIDDLEWARES
import { errorHandler, notFount } from './middlewares/errorMiddleware.js'


const app = express()

dotenv.config()
const port = process.env.PORT || 8000

import { verifyEmail } from './controllers/signUpController.js'

// app.get('/', (req, res) => {
//     res.send('okkkk')
// })

app.get('/verify/:userId/:uniqueString', verifyEmail)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use(errorHandler)
app.use(notFount)


// DATABASE CONNECTION

let mongoURL = ''

if (process.env.NODE_ENV === 'production') {
    mongoURL = process.env.MONGO_URI_PRODUCTION
    console.log('Running in Production environment');
} else if (process.env.NODE_ENV === 'local') {
    mongoURL = process.env.MONGO_URI_LOCAL
    console.log('Running in local environment');
} else {
    console.log('ENVIRONMENT NOT SET CORRECTLY, PLEASE CHECK')

}

// MONGOOSE CONNECTION
mongoose.connect(mongoURL)
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to port: ${port} and dataBase ${mongoURL}`)
        })

    })
    .catch(err => console.log('err'))






