const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.PG_URI) 

const connectToDb = async () => {
    try {
        const success = await sequelize.authenticate();
        if (success) {
            console.log('Connected to PostGres Database.');
        }
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectToDb