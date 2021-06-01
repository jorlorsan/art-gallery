const jwt = require('jsonwebtoken')
const artistRouter = require('express').Router()

const { auth, isEmployee } = require('../utils/functions')

const { 
    getAllArtists, 
    createArtist,
    filterArtists,
    deleteArtist,
    getArtist,
    updateArtist,
    addPublicationToArtist
} = require('../controllers/artists.controller')

artistRouter.get( '/', getAllArtists)
artistRouter.get('/:artistId',getArtist)
artistRouter.post( '/', auth, isEmployee, createArtist)
artistRouter.get('/filter', filterArtists)
artistRouter.delete('/:artistId', auth, isEmployee, deleteArtist)
artistRouter.put('/:artistId', auth, isEmployee, addPublicationToArtist)

artistRouter.put('/:artistId', updateArtist)

module.exports = artistRouter
