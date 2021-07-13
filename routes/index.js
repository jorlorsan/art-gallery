const router = require('express').Router()

const artistRouter = require('./artists.router')
const artworkRouter = require('./artworks.router')
const publicationRouter = require('./publications.router')
const authRouter = require('./auth.router')
const contactRouter = require('./contacts.router')
const exhibitionFairRouter = require('./exhibitionsFairs.router')
const shipmentRouter = require('./shipments.router')
const documentRouter = require('./documents.router')
const employeeRouter = require('./employees.router')

router.use('/artworks', artworkRouter)
router.use('/artists', artistRouter)
router.use('/publications', publicationRouter)
router.use('/auth', authRouter)
router.use('/contacts', contactRouter)
router.use('/exhibitionsFairs', exhibitionFairRouter)
router.use('/shipments', shipmentRouter)
router.use('/documents', documentRouter)
router.use('/employees', employeeRouter)

module.exports = router
