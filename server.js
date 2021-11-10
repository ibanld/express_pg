const express = require('express')
const db = require('./config/db')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const connectDb = db()
const PORT  = process.env.PORT || 5000

const clientHost = process.env.NODE_ENV === "production" ? 'https://linkToApp.com.br' : 'http://localhost:3000'

var corsOptions = {
    origin: clientHost,
    optionsSuccessStatus: 200 
  }

app.set('trust proxy', 1) 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors(corsOptions))

app.use('/api/v1/users', require('./routes/api/v1/user.router'))

app.listen(PORT, () => 
    console.log(`\n--------// SERVER UP AND RUNNING //--------
        \n- PORT: ${PORT} 
        \n- MODE: ${process.env.NODE_ENV === 'production' ? 'PRODUCTION VERSION' : 'Development stage'} 
        \n- EXPRESS: ${express ? 'YES' : 'NO'} 
        \n- CORS: ON
        \n- DB: ${connectDb ? 'Connected to Database' : 'Database Connection Error!'}
        \n> Read README.md to connect with CLIENT <
        \n___________________________________________ 
        \nServer logs: `
))
