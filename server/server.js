const express = require('express')
const routes = require('./routes')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerOptions = require('./config/swagger')
const app = express()
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT2 || 1080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('', routes)
const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(express.static(path.join(__dirname, '..', 'client')))
app.get('/*', express.static(__dirname + '../client'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/index.html'))
})
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`)
})

module.exports = app