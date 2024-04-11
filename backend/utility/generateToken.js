import jwt from 'jsonwebtoken'

const generatePassword = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie(jwt, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'local',
        sameSite: 'strict',
        expiresIn: 30 * 24 * 60 * 60 * 1000

    })

}

export default generatePassword