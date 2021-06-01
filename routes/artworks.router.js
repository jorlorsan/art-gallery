const jwt = require('jsonwebtoken')
const artworkRouter = require('express').Router()
const { auth, isAdmin } = require('../utils/functions')

const { 
  getAllArtworks, 
  createArtwork,
  getArtwork,
  deleteArtwork,
  updateArtwork,
  filterArtworks
 } = require('../controllers/artworks.controller')



artworkRouter.get( '/', getAllArtworks)
artworkRouter.post( '/', auth, isAdmin, createArtwork)
artworkRouter.get('/:artworkId',getArtwork)
artworkRouter.get('/filter', filterArtworks)
artworkRouter.delete('/:artworkId', deleteArtwork,
)
artworkRouter.put('/:artworkId', updateArtwork)

module.exports = artworkRouter