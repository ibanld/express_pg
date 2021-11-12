const Session = require('../models/Sessions.model.js')
require('dotenv').config()

const COOKIE_NAME = process.env.COOKIE_NAME

// Retrieve all sessions from database
const getSessions = async () => {
    try {
        const sessions = await Session.findAll()
        return sessions
    } catch (err) {
        return res.send({ message: err.message })
    }
}

// Check if session is expired
const isExpired = expireDate => {
    const now = Date.now()
    const expire = Date.parse(expireDate)
    if (expire > now) {
        // We return true and continue 
        return true
    } else {
        // We return false and redirect to home page
        return false
    }
}

// Check if session is valid
const checkSession =  async (req, res, next) => { 
    try {
        const sessions = await getSessions()
        const cookie = req.signedCookies[COOKIE_NAME]
        if (sessions) {
            const mySession = sessions.filter( session => session.sid === cookie)
            if (mySession.length > 0){
                const expired = isExpired(mySession[0].expire)
                if (expired) {
                    return next()
                } else {
                    return res.redirect('/')
                }
            } else {
                return res.redirect('/')
            }
        } 
    } catch (err) {
        return res.send({ message: err.message })
    }
}

module.exports = checkSession