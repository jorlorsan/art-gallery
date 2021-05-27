const router = require('express').Router()

const artworkRouter = require('./artworks.router')

router.use('/artworks', artworkRouter)

module.exports = router