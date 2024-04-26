import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'path'


// ROUTES
import userRoutes from './routes/userRoutes.js'


// MIDDLEWARES
import { errorHandler, notFount } from './middlewares/errorMiddleware.js'


const app = express()

dotenv.config()
const port = process.env.PORT

import { verifyEmail } from './controllers/signUpController.js'
import { verifyResetLink } from './controllers/resetController.js'

// app.get('/', (req, res) => {
//     res.send('okkkk')
// })

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
    console.log('joining')
} else {
    app.get('/', (req, res) => res.send('Server is ready!'))
}


app.get('/verify/:userId/:uniqueString', verifyEmail)
app.get('/verifyreset/:userId/:resetString', verifyResetLink)



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use(errorHandler)
app.use(notFount)




// DATABASE CONNECTION

let mongoURL = ''

if (process.env.NODE_ENV === 'production') {
    mongoURL = process.env.MONGO_URI_PROD
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






