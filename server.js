const express = require('express')
const db = require('./config/db')
const cors = require('cors')

const app = express()
const connectDb = db()
const PORT  = process.env.PORT || 5000

const clientHost = process.env.NODE_ENV = "production" ? 'https://linkToApp.com.br' : 'http://localhost:3000'

var corsOptions = {
    origin: clientHost,
    optionsSuccessStatus: 200 
  }

app.use(cors(corsOptions))

app.listen(PORT, () => 
    console.log(`\n--------// SERVER UP AND RUNNING //--------
        \n- PORT: ${PORT} 
        \n- MODE: ${process.env.NODE_ENV === 'production' ? 'PRODUCTION VERSION' : 'Development stage'} 
        \n- EXPRESS: ${express ? 'YES' : 'NO'} 
        \n- CORS: ON
        \n- DB: ${connectDb && 'Connected to Database'}
        \n> Read README.md to connect with CLIENT <
        \n___________________________________________ 
        \nServer logs: `
))
