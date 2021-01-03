const { Router } = require('express')
const { getArtillery } = require('./controllers')
const router = Router()

router.post("", getArtillery)

module.exports = router