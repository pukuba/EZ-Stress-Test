const { Router } = require('express')
const { getArtillery } = require('./controllers')
const router = Router()

router.get("", getArtillery)

module.exports = router