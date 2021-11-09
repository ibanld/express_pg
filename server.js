const express = require('express')

const app = express()

const PORT  = process.env.PORT || 5000

app.listen(PORT, () => 
    console.log(`------// SERVER UP AND RUNNING // --- \n 
        - PORT: ${PORT} \n 
        - MODE: ${process.env.NODE_ENV} \n
        - EXPRESS: ${express ? 'YES' : 'NO'} \n
        - DB: database `
))
