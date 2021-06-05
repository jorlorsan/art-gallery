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

artistRouter.get( '/', auth, isEmployee, getAllArtists)
artistRouter.get('/:artistId', auth, isEmployee, getArtist)
artistRouter.post( '/', auth, isEmployee, createArtist)
artistRouter.get('/filter', auth, isEmployee, filterArtists)
artistRouter.delete('/:artistId', auth, isEmployee, deleteArtist)
artistRouter.put('/publications/:artistId', auth, isEmployee, addPublicationToArtist)
artistRouter.put('/:artistId', auth, isEmployee, updateArtist)

module.exports = artistRouter
