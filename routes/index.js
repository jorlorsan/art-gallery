const router = require('express').Router()

const artistRouter = require('./artists.router')
const artworkRouter = require('./artworks.router')
const publicationRouter = require('./publications.router')
const authRouter = require('./auth.router')

router.use('/artworks', artworkRouter)
router.use('/artists', artistRouter)
router.use('/publications', publicationRouter)
router.use('/auth', authRouter)

module.exports = router
