const User = require('../models/Users.model.js')
const Session = require('../models/Sessions.model.js')
const bcrypt = require('bcryptjs')
require('dotenv').config()

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const findUser = await User.findOne({user: username})
        if (findUser) {
            const checkPassword = bcrypt.compareSync(password, findUser.password)
            if (checkPassword) {
                // We remove the PASSWORD property from the findUser object for security purposes
                delete findUser.dataValues.password
                // We assign the value session to the session ID
                session = req.sessionID
                // After creating new session we save it into the Sessions Table in the DB
                const saveSession = await Session.create({
                    username: username,
                    sid: session
                })
                if (saveSession) {
                    return res.cookie(process.env.COOKIE_NAME, session, { signed: true }).send({
                        message: 'Login deu certo!',
                        data: {
                            user: findUser,
                            sessionID: session,
                            auth: true
                        }
                    })
                }
            } else {
                return res.send({
                    message: 'Senha incorrecta!'
                })
            }
        } else {
            return res.send({
                message: 'Usuario incorrecto!'
            })
        }
    } catch (err) {
        return res.send({message: 'Algo nao deu certo!:' + err.message})
    }
}

const COOKIE_NAME = process.env.COOKIE_NAME

exports.logout = async (req, res) => {
    try {
        const session = req.signedCookies[COOKIE_NAME]
        const destroySession = await Session.destroy({ where: { sid: session } })
        req.session.destroy()
        if (destroySession) {
          res.redirect('/logout')
        }
    } catch (err) {
        return res.send({message: 'Algo nao deu certo!'})
    }
}