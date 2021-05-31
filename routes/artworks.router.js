const jwt = require('jsonwebtoken')
const artworkRouter = require('express').Router()
const { auth, isAdmin } = require('../utils/functions')

const { getAllArtworks, createArtwork } = require('../controllers/artworks.controller')

artworkRouter.get( '/', getAllArtworks)
artworkRouter.post( '/', auth, isAdmin, createArtwork)




   /* req.body
    req.query
    req.params
    req.headers // req.headers.token
  */




module.exports = artworkRouter