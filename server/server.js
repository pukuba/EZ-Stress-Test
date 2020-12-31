const express = require('express')
const routes = require('./routes')
const path = require('path')
const app = express()
const fs = require('fs')
require('dotenv').config()

const port = process.env.PORT2
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('', routes)

app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`)
})