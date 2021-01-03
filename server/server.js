const express = require('express')
const routes = require('./routes')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerOptions = require('./config/swagger')
const app = express()

require('dotenv').config()

const port = process.env.PORT2 || 1080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('', routes)
const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`)
})