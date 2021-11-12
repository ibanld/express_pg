const { Sequelize } = require('sequelize')
require('dotenv').config()
const User = require('../models/Users.model')
const Session = require('../models/Sessions.model')

const sequelize = new Sequelize(process.env.PG_URI) 

const connectToDb = async () => {
    try {
        await User.sync()
        await Session.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = connectToDb