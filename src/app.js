const express = require('express')
const db = require('./database/index')
const router = require('./routes.js/routes')
const app = express()
require('dotenv').config();

app.use(express.json())

const port = 3333

app.use(router)


app.listen(port, async () => {
    try{
        await db.initDatabase().then(() => console.log('connected'))
    }catch{
        console.log(error)
        console.log('connection error')
        return 
    }
    console.log(port)
})