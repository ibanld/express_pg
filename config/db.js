const { Sequelize } = require('sequelize')
require('dotenv').config()
const User = require('../models/Users.model')

const sequelize = new Sequelize(process.env.PG_URI) 

const connectToDb = async () => {
    try {
        await sequelize.authenticate()
        await User.sync()

    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = connectToDb