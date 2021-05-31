const router = require('express').Router()

const artistRouter = require('./artists.router')
const artworkRouter = require('./artworks.router')
const publicationRouter = require('./publications.router')
const authRouter = require('./auth.router')
const exhibitionFairRouter = require('./exhibitionsFairs.router')
const shipmentRouter = require('./shipments.router')

router.use('/artworks', artworkRouter)
router.use('/artists', artistRouter)
router.use('/publications', publicationRouter)
router.use('/auth', authRouter)
router.use('/exhibitionsFairs', exhibitionFairRouter)
router.use('/shipments', shipmentRouter)

module.exports = router
