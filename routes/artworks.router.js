const jwt = require('jsonwebtoken')
const artworkRouter = require('express').Router()
const { auth, isEmployee } = require('../utils/functions')

const { 
  getAllArtworks, 
  getAllArtworksAuth,
  createArtwork,
  getArtwork,
  deleteArtwork,
  updateArtwork,
  filterArtworks
 } = require('../controllers/artworks.controller')



artworkRouter.get( '/', getAllArtworks)
artworkRouter.get( '/auth/', auth, getAllArtworksAuth)
artworkRouter.post( '/', auth, isEmployee, createArtwork)
artworkRouter.get('/filter', auth, filterArtworks)
artworkRouter.get('/:artworkId', getArtwork)
artworkRouter.delete('/:artworkId', auth, isEmployee, deleteArtwork)
artworkRouter.put('/:artworkId', auth, isEmployee, updateArtwork)

module.exports = artworkRouter