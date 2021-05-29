const jwt = require('jsonwebtoken')
const artistRouter = require('express').Router()

const { 
    getAllArtists, 
    createArtist,
    filterArtists,
    deleteArtist,
    getArtist,
    updateArtist 
} = require('../controllers/artists.controller')

artistRouter.get( '/', getAllArtists)
artistRouter.post( '/', createArtist)
artistRouter.get('/filter', filterArtists)
artistRouter.delete('/:artistId', deleteArtist)
artistRouter.get('/:artistId',getArtist)
artistRouter.put('/:artistId', updateArtist)

module.exports = artistRouter
