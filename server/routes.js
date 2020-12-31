const artilleryRouter = require('./app/artillery/router')
const { Router } = require('express')

const router = Router()

router.use('/artillery', artilleryRouter)

module.exports = router 