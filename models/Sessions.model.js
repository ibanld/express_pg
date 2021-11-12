const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.PG_URI)

const Session = sequelize.define('Session', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    sid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now() + 86400000
    }
}, {
  timestamps: true
})

module.exports = Session